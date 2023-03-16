const Command = require('@structures/framework/Command');
const Canvas = require('canvas');
const basketKits = {
  basket1: {
    imageSize: 717,
    minMax: [5, 15],
    guessAmt: 3,
    normalObject: "https://discord.mx/X8NMeNOp44.png",
    diffObject: "https://discord.mx/SR3Ez0CsnF.png",
  },
  basket2: {
    imageSize: 814,
    minMax: [5, 15],
    guessAmt: 3,
    normalObject: "https://discord.mx/MppuOvvXRq.png",
    diffObject: "https://discord.mx/dspPeW8No0.png",
  },
};

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'Guess which house is trying to trick you.',
      options: [
        {
          name: "difficulty",
          description: "The difficulty of the game.",
          type: 3,
          required: true,
          choices: [
            { name: "Basket #1", value: "basket1" },
            { name: "Basket #2", value: "basket2" },
          ],
        },
      ],
      category: "Games",
    })

  }

  async run(ctx) {
    const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const difficulty = ctx.interaction.options.getString("difficulty") || "basket1";
    const { imageSize, minMax, normalObject, diffObject, guessAmt } = basketKits[difficulty];

    let hidingSpots = randInt(...minMax);
    if (hidingSpots > 25) hidingSpots = 25;
    if (hidingSpots < 3) hidingSpots = 3;

    const canvas = Canvas.createCanvas((hidingSpots < 5 ? hidingSpots : 5) * imageSize, Math.ceil(hidingSpots / 5) * imageSize);
    const ctx2 = canvas.getContext("2d");
    const [ntree, ptree] = await Promise.all([ Canvas.loadImage(normalObject), Canvas.loadImage(diffObject), ]);
    const diffObjectNum = Math.floor(Math.random() * hidingSpots) + 1;

    for (let i = 1, y = 0, x = 1; i <= hidingSpots; i++) {
      ctx2.drawImage(diffObjectNum === i ? ptree : ntree, x, y, imageSize, imageSize);
      if (i % 5 === 0) (y += imageSize), (x = 1);
      else x += imageSize;
    }

    const embed = new ctx.EmbedBuilder()
      .setTitle("🥚 Find the Difference")
      .setColor("#FCCE95")
      .setDescription("Which image is different from the rest?")
      .setImage(`attachment://find-the-difference.png`)
      .setFooter({text: "You only have 2 minutes to guess." });
    const msg = await ctx.interaction.editReply({
      embeds: [embed],
      files: [{ attachment: canvas.toBuffer(), name: "find-the-difference.png" }],
      components: Array.from({ length: Math.ceil(hidingSpots / 5) }, (_, ri) => ({
        type: 1,
        components: Array.from(
          { length: Math.ceil(hidingSpots / 5) === 1 ? hidingSpots : Math.ceil(hidingSpots / 5) === ri + 1 ? hidingSpots - (Math.ceil(hidingSpots / 5) - 1) * 5 : 5, },
          (_, i) => ({ type: 2, style: 2, emoji: { name: "🧺" }, customId: `find-the-difference_${ri}_${i}`, })
        ).slice(0, 5),
      })),
    });

    const timeLeft = Date.now() + 120000;
    const collector = msg.createMessageComponentCollector({
      filter: (inter) =>
        inter.user.id === ctx.interaction.user.id &&
        inter.customId.startsWith("find-the-difference_"),
      time: 120_000,
    });
    let triesLeft = guessAmt;

    collector.on("end", (_, reason) => {
      let embed2 = new ctx.EmbedBuilder()
        .setTitle("Yikes")
        .setColor("Red")
        .setDescription(`You ran out of time.\n\nWant to play again? Run the command again!`);
      if (reason === "fail")
        embed2 = new ctx.EmbedBuilder()
          .setTitle("Yikes")
          .setColor("Red")
          .setDescription(`You ran out of attempts. The correct answer was Basket #${diffObjectNum}.\n\nWant to play again? Run the command again!`);
      else if (reason === "success")
        embed2 = new ctx.EmbedBuilder()
          .setTitle("Nice job")
          .setColor("Green")
          .setDescription(`You successfully finished with ${triesLeft} attempt${triesLeft == 1 ? "" : "s"} left`);

      msg.edit({ embeds: [embed, embed2], components: [], });
    });

    let aNumberThatIsVeryLongBecauseItIsOnlyUsedOnce = 0;
    const array = Array.from({ length: 5 }, (_, ri) => Array.from({ length: 5 }, (_, i) => aNumberThatIsVeryLongBecauseItIsOnlyUsedOnce++));

    collector.on("collect", (interaction) => {
      triesLeft -= 1;
      const [ri, ti] = interaction.customId.split("_").slice(1);

      if (parseInt(array[ri][ti]) === diffObjectNum-1) {
        interaction.deferUpdate();
        collector.stop("success");
      } else if (triesLeft != 0) {
        interaction.reply({
          embeds: [
            new ctx.EmbedBuilder()
              .setTitle("Try Again")
              .setColor("Orange")
              .setDescription(`You still have ${triesLeft} attempts and time ends <t:${Math.floor((Date.now()+(timeLeft-Date.now()))/1000)}:R>, to guess the correct one.`),
          ],
          ephemeral: true,
        });
      } else {
        interaction.deferUpdate();
        collector.stop("fail");
      }
    });
  }
}