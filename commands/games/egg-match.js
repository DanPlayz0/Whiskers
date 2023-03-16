const Command = require("@structures/framework/Command");

const difficultyKit = {
  sandbox: {
    gameTime: 950_000,
    maxTries: 9999,
  },
  easy: {
    gameTime: 300_000,
    maxTries: 30,
  },
  normal: {
    gameTime: 150_000,
    maxTries: 20,
  },
  hard: {
    gameTime: 120_000,
    maxTries: 15,
  },
  expert: {
    gameTime: 85_000,
    maxTries: 10,
  }
};

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Match the egg pairs!",
      category: "Games",
      options: [
        {
          name: "difficulty",
          description: "The difficulty of the game.",
          type: 3,
          required: true,
          choices: [
            { name: 'Sandbox', value: 'sandbox' },
            { name: 'Easy', value: 'easy' },
            { name: 'Normal', value: 'normal' },
            { name: 'Hard', value: 'hard' },
            { name: 'Expert', value: 'expert' },
          ]
        },
      ],
    });
  }

  async run(ctx) {
    const difficulty = ctx.interaction.options.getString("difficulty") || "normal";
    const { gameTime, maxTries } = difficultyKit[difficulty];

    let hidingSpots = 16;

    let aNumberThatIsVeryLongBecauseItIsOnlyUsedOnce = 0;
    const onceLogicArray = Array.from({ length: 4 }, (_, ri) => Array.from({ length: 4 }, (_, i) => aNumberThatIsVeryLongBecauseItIsOnlyUsedOnce++));

    const componentsArray = Array.from({ length: Math.ceil(hidingSpots / 4) }, (_, ri) => ({
      type: 1,
      components: Array.from(
        { length: Math.ceil(hidingSpots / 4) === 1 ? hidingSpots : Math.ceil(hidingSpots / 4) === ri + 1 ? hidingSpots - (Math.ceil(hidingSpots / 4) - 1) * 4 : 4, },
        (_, i) => ({ type: 2, style: 2, emoji: { name: "🥚", id: undefined }, customId: `memorymatch_${ri}_${i}_${onceLogicArray[ri][i]}`, })
      ).slice(0, 4),
    }));

    const embed = new ctx.EmbedBuilder()
      .setTitle("Egg Match")
      .setColor("Orange")
      .setDescription(`A classic game where the goal is to find pairs of matching cards by turning them over and remembering their locations.\n\nGame ends <t:${Math.floor((Date.now() + gameTime) / 1000)}:R>`);
    const msg = await ctx.interaction.editReply({
      embeds: [embed],
      components: componentsArray
    });

    const timeLeft = Date.now() + gameTime;
    const collector = msg.createMessageComponentCollector({
      filter: (inter) =>
        inter.user.id === ctx.interaction.user.id &&
        inter.customId.startsWith("memorymatch_"),
      time: gameTime,
    });
    let triesLeft = maxTries;

    collector.on("end", (_, reason) => {
      let embed2 = new ctx.EmbedBuilder()
        .setTitle("Yikes")
        .setColor("Red")
        .setDescription(`You ran out of time.\n\nWant to play again? Run the command again!`);
      if (reason === "fail")
        embed2 = new ctx.EmbedBuilder()
          .setTitle("Yikes")
          .setColor("Red")
          .setDescription(`You ran out of match attempts.\n\nWant to play again? Run the command again!`);
      else if (reason === "success") {
        embed2 = new ctx.EmbedBuilder()
          .setTitle("Nice job")
          .setColor("Green")
          .setDescription(`You successfully finished with ${triesLeft} match attempt${triesLeft == 1 ? "" : "s"} and ${Math.round((timeLeft - Date.now()) / 1000) % 60 == 0 ? `${Math.round((timeLeft - Date.now()) / 1000)} seconds` : `${(Math.round((timeLeft - Date.now()) / 1000) / 60).toFixed(1)} minutes`} seconds left`);

        return msg.edit({ embeds: [embed, embed2], components: componentsArray, });
      }
      msg.edit({ embeds: [embed, embed2], components: [], });
    });

    let lastSelected = null;
    let logicArray = Array.from({ length: hidingSpots / 2 }, (_, i) => i + 1);


    const emojiArray = [
      'egg_teal:1084405944022208522', 'egg_deeppink:1084405946048057415', 'egg_green:1084405947574780004',
      'egg_aqua:1084405948732411924', 'egg_lime:1084405950674391080', 'egg_orange:1084405952003981362',
      'egg_pink:1084405953350340609', 'egg_purple:1084405955468460033', 'egg_red:1084405956991004744',
      'egg_violet:1084405958953943080', 'egg_white:1084406024502530049', 'egg_yellow:1084406026691944509'
    ];

    const scramble = (word) => word.sort(() => Math.random() - 0.5);
    logicArray = [...scramble(logicArray), ...scramble(logicArray)]

    const resetComponent = (row, col) => {
      componentsArray[row].components[col].emoji = { name: "🥚", id: undefined };
    }
    const disableComponent = (row, col, id) => {
      componentsArray[row].components[col].disabled = true;
      emojiComponent(row, col, id);
    }
    const emojiComponent = (row, col, id) => {
      const emoji = emojiArray[logicArray[id] - 1].split(':');
      componentsArray[row].components[col].emoji = { name: emoji[0], id: emoji[1] };
    }

    let canAction = true, matched = 0;
    collector.on("collect", (interaction) => {
      if (!canAction) return interaction.reply({ content: "Slow down! Try again in a second or two.", ephemeral: true })
      interaction.deferUpdate();

      if (!lastSelected) {
        lastSelected = interaction.customId;
        const position = lastSelected.split('_');
        emojiComponent(...position.slice(1));
      } else if (lastSelected) {
        let lastId = lastSelected.split('_'), currentId = interaction.customId.split('_');

        if (lastSelected != interaction.customId && logicArray[lastId.slice(-1)[0]] == logicArray[currentId.slice(-1)[0]]) {
          matched += 1;
          disableComponent(currentId[1], currentId[2], currentId[3]);
          disableComponent(lastId[1], lastId[2], lastId[3]);

          if (matched >= logicArray.length / 2) return collector.stop("success");
        } else {
          // console.log(currentId.slice(1));
          emojiComponent(...currentId.slice(1));
          canAction = false;
          setTimeout(() => {
            canAction = true;
            resetComponent(lastId[1], lastId[2]);
            resetComponent(currentId[1], currentId[2]);
            interaction.message.edit({ components: componentsArray });
          }, 2100)
        }
        triesLeft -= 1;
        lastSelected = null;
        if(triesLeft <= 0) return collector.stop("fail");
      }
      interaction.message.edit({ components: componentsArray });
    });



  }
};

function shuffle(array) {
  const arr = [...array];

  for (let index = arr.length - 1; index > 0; index--) {
    const ri = Math.floor(Math.random() * (index + 1));
    const original = arr[index];

    arr[index] = arr[ri];
    arr[ri] = original;
  }

  return arr;
}