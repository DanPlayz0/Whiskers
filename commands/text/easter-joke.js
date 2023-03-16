const Command = require("@structures/framework/Command");
const jokes = [
  "Why did the Easter egg hide? Because it was a little chicken!",
  "What do you call a rabbit that tells good jokes? A funny bunny!",
  "Why do Easter eggs hate telling jokes? They always crack each other up!",
  "What do you get when you cross a bunny with an onion? A rabbit that makes you cry!",
  "What do you call a mischievous egg? A practical yolker!",
  "Why did the Easter bunny cross the road? To prove he wasn't a chicken!",
  "How does the Easter bunny stay in shape? With lots of eggs-ercise!",
  "What do you call a group of rabbits hopping backwards? A receding hare-line!",
  "Why do Easter chicks love social media? They can peep on their friends!",
  "How do Easter bunnies stay healthy? By egg-ercising and eating lots of carrots!",
  "What did the Easter bunny say to the carrot? It's been nice gnawing you!",
  "What do you call an egg from outer space? An \"Egg-straterrestrial\"!",
  "What do you get when you pour hot water into a rabbit hole? A hot cross bunny!",
  "What did the egg say to the boiling water? \"It's going to take me a few minutes to get hard, I just got laid by a chicken!\"",
  "What kind of music do Easter bunnies like? Hip-hop!",
  "What do you call a rabbit with fleas? Bugs Bunny!",
  "Why did the Easter egg refuse to go to school? Because it was already egg-sperienced!",
  "How does the Easter bunny travel? By hare-plane!",
  "What do you call a rabbit who tells jokes? A funny bunny!",
  "What do you call a line of rabbits walking backwards? A receding hareline!",
  "Why did the Easter bunny cross the playground? To get to the other slide!",
  "Why did the Easter egg refuse to tell jokes? It cracked under the pressure!",
  "Why was the Easter bunny so upset? He was having a bad hare day!",
  "What did the Easter egg say to the hot water? \"I'm starting to feel a little poached!\"",
  "Why don't eggs go to the gym? They don't want to get scrambled!",
  "What kind of stories do Easter eggs like to hear? Funny yolks!",
  "What do you call a mischievous egg? A practical yolker!",
  "What do you call a rabbit with a dictionary in its pocket? A words bunny!",
  "How do bunnies stay healthy? By eating lots of eggs-ercise and carrots!",
];

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Get a easter themed joke.",
      category: "Text",
      options: [
        {
          name: "line",
          description: "The joke number to show.",
          type: 4,
          required: false,
          min_value: 1,
          max_value: jokes.length,
        },
      ],
    });
  }

  async run(ctx) {
    const ideaNumber = ctx.args.getInteger('line') ?? (Math.floor(Math.random() * jokes.length) + 1);
    ctx.sendMsg(`**#${ideaNumber}:** ${jokes[ideaNumber - 1]}`)
  }
};