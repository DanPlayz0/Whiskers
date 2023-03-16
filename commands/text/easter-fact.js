const Command = require("@structures/framework/Command");
const facts = [
  [
      "The history of Easter began in the 2nd century.",
      "While the earliest recorded observance of the holiday celebration occurred then, people commemorated the Resurrection earlier than that."
  ],
  [
      "Easter is the oldest among Christian holidays.",
      "Early Christians used to observe Christ’s Resurrection every single Sunday. When they started celebrating the then-pagan holiday Easter, they settled on dedicating the whole day to Him annually."
  ],
  [
      "As per the Bible, Jesus Christ was not alone on the day of the Resurrection.",
      "Matthew 28 tells of an angel who came down from heaven to the tomb three days after Jesus died. By moving the heavy stone by the front, the angel prevented the disciples from moving Christ’s body."
  ],
  [
      "The concept of the Easter bunny giving eggs and candies traces its origin in Germany.",
      "The first written document of the said tradition appeared in the 16th century. By the 1700s, Dutch immigrants brought the bunny ideas to the United States when they settled in Pennsylvania."
  ],
  [
      "The Easter Bunny sprung to life from legends.",
      "Several cultures perceive rabbits as a symbol of new life. The German legend of the Easter Bunny tells the story of a woman who plants hidden decorated eggs throughout the town on occasions of famine. Upon finding eggs, children would then see a big bunny hopping off."
  ],
  [
      "Eastern and Western Christian would celebrate Easter at different times.",
      "Eastern Christianity bases its Easter dates on the Julian Calendar."
  ],
  [
      "Easter comes after forty days of Lent in the Christian calendar.",
      "The count does not include Sundays. Traditions include fasting and deeds of penance."
  ],
  [
      "The Holy Week before Easter Sunday has dedicated names and recognitions.",
      "One of them is the Maundy Thursday which commemorates the Last Supper that Jesus had with his disciples. Another is the Good Friday in recognition of His Crucifixion. The Holy Saturday is a day of transition for the Crucifixion and the Resurrection."
  ],
  [
      "Western Christianity observes Easter on the first Sunday after the first full moon following the spring equinox.",
      "It involves both Catholics and Protestants. Due to the complex calculations, Easter Sunday could be anytime from March 22 to April 25."
  ],
  [
      "In Polish folklore, the Virgin Mary offered eggs to the guard soldiers of Christ on the cross.",
      "As she begged for their mercy, her tears dropped and left stains on the eggs."
  ],
  [
      "The official flower of Easter is the white lily.",
      "These ‘Easter lilies’ symbolize grace and purity. Hence, people decorate their homes and churches with these flowers during Easter."
  ],
  [
      "The first recorded use of decorated Easter eggs was in the 13th century.",
      "The rising of Jesus from the tomb is associated with the emergence of new from an egg’s shell. Eventually, it evolved into an official symbol of the Resurrection."
  ],
  [
      "The tradition of bunnies on Easter originated from Protestant communities in Europe.",
      "While it began in the 17th century, it only became common in the 19th century. They believe that the Easter bunny lays, decorates, and hides the Easter eggs."
  ],
  [
      "Easter in the U.S. is celebrated by leaving children Easter baskets on the morning of the holiday.",
      "It was one way of how the Protestants manifested their rejection of the Catholics’ Easter traditions. Moreover, some European countries feature other animals. The cuckoo brings the eggs in Switzerland while the fox does it in Westphalia."
  ],
  [
      "Easter in medieval times involves throwing an egg in churches.",
      "The custom would start with the priest throwing a hard-boiled egg to a choir boy. He who catches it would then toss it to another, and so on. Upon the clock striking 12, whoever holds the egg wins and keeps the egg."
  ],
  [
      "Greek Orthodox followers paint their Easter eggs with the color red.",
      "It signifies the blood of Jesus and his triumph over death. Further, red also symbolizes the renewal of life."
  ],
  [
      "In some European nations, people burn Easter fires.",
      "This tradition is believed to represent fertility."
  ],
  [
      "Pretzels also used to join in the Easter celebrations.",
      "Its shape earned associations with Easter due to its resemblance of arms crossed in prayer."
  ],
  [
      "Children would race on Easter morning to see who got a basket from the Bunny.",
      "Contrary to the typical wrapped gifts and boxes, Easter baskets are open. This design’s purpose is to resemble a bird’s nest which keeps eggs safe."
  ],
  [
      "The tradition of egg painting is called the 'Pysanka'.",
      "It traces its origin from Ukraine and involves the use of dyes and wax in giving the egg color."
  ],
  [
      "Early egg dyes were made using natural materials.",
      "Some items used are flower petals, juices, onion peels, and tree bark."
  ],
  [
      "Among the holiday eggs is one called 'The Real Easter Egg'.",
      "This particular piece holds an explanation of the Christian meaning of the holiday. Back in 2012, the number of Real Easter Eggs sold to churches was at 90,000."
  ],
  [
      "President Rutherford Hayes initiated the annual egg roll tradition at the White House.",
      "First Families following his tenure kept the Easter customs going until today."
  ],
  [
      "President Donald Trump's current press secretary was an ex-Easter Bunny.",
      "Sean Spicer would dress up as the Easter Bunny back in George Bush’s administration. The character has always been a part of the White House Easter Egg Roll since day one. Proud of his bunny days, Spicer even lists it on his GOP biography."
  ],
  [
      "People in Europe call it the Easter Hare.",
      "Starting from there, the bunny hopped its way to stardom in the U.S. in the 1800s. Aside from having Easter egg hunts, other Easter customs include making Easter baskets and wearing Easter bonnets."
  ],
  [
      "People in Scotland and North-East England would roll painted eggs down steep hills.",
      "Some Americans also do it by using spoons in pushing the eggs."
  ],
  [
      "Dyeing chicks for the Easter season reached the point of debate among celebrants.",
      "Several hatcheries have already stopped participating. Still, others claim that it is not harmful to their health as the dye sheds along with their fluff when they start to grow feathers."
  ],
  [
      "Around half of the U.S. prohibited dyeing chicks for Easter.",
      "Meanwhile, Florida chose to go the other way when they overturned the 45-year-old law."
  ],
  [
      "The Czar of Russia funds Faberge annually for an enameled Easter egg.",
      "For its first design, the jeweler produced an egg inside of which a diamond crown miniature and a tiny ruby egg sit."
  ],
  [
      "The tradition of buying new clothes for Easter started in New York in the mid-1800s.",
      "People believed that wearing a new outfit on Easter would ensure them good luck throughout the year. Until today, more and more people keep up the custom."
  ],
  [
      "The Easter Bonnet sprung from a ballad entitled 'Easter Parade'.",
      "Irving Berlin, a composer, launched the bonnet to American pop culture in 1933. The song remains to be one of the popular tunes for Easter to date."
  ],
  [
      "The name for the Good Friday before Easter has many theories.",
      "Despite the Passion of Christ Catholics commemorate on this day, they still believe that there is some good in it. They see the suffering and death of Jesus as a stepping stone for His Resurrection and victory over death and sin."
  ],
  [
      "In another theory, Good Friday came from 'God's Friday'.",
      "However, this theory has no etymological basis. Linguist Ben Zimmer noted that Good Friday does not translate to ‘Gottes Freitag’ or ‘God’s Friday’ in German. Instead, it is ‘Karfreitag’ which means ‘Sorrowful Friday.’"
  ],
  [
      "The last theory refers to the antique meaning of the word 'good'.",
      "Other names for the day include ‘Sacred Friday’ in Roman languages and ‘Passion Friday’ in Russian. Further, the Oxford English Dictionary could support this theory."
  ],
  [
      "Italy made the tallest chocolate Easter egg in 2011.",
      "It stood with a height of 10.39 meters and weighed 7,200 kilograms. In other words, the tall Easter egg is higher than a giraffe and heavier than an elephant."
  ],
  [
      "Brazil made another Easter Bunny record in February 2017.",
      "Located in Minas Gerais, Brazil, the Equipe da Casa do Chocolate at Shopping Uberaba created a giant bunny out of cocoa. Nine professional chocolatiers built the bunny for eight days straight until they set a Guinness World Record."
  ],
  [
      "Florida held the largest Easter egg hunt in 2007.",
      "The hunt involved 9,753 children and 501,000 eggs."
  ],
  [
      "Contrary to what many people think, hollow chocolate bunnies are better.",
      "As solid chocolates would be hard as a brick, it could cause great damage to teeth. Whereas the hollow pieces have greater value due to the chocolate footprint that it has."
  ],
  [
      "The 2007 Faberge Easter Egg sold for around £9 million.",
      "Every hour, the egg would pop up a jewel cockerel which would flap its wings, nod its head, and make a crowing noise. The Russian Royal Family gifted the gold-and-pink enamel egg to Baron Edouard de Rothschild for his engagement."
  ],
  [
      "Peeps ranks top on the most popular Easter candy, non-chocolate category.",
      "Every Easter, Americans would spend over 700 million for their favorite marshmallow peeps."
  ],
  [
      "When the Peeps first came out in 1953, making one would take 27 hours.",
      "Back then, the treats were handmade using a pastry tube. Thankfully, the production process evolved to only taking up 6 minutes with The Depositor machine that they are using now."
  ],
  [
      "Jellybeans were first introduced in the 1930s as an Easter treat.",
      "Today, consumption among Americans reach up to 16 million pieces during the said holiday. That amount is enough to have jellybeans circle the globe three times."
  ],
  [
      "William Scrafft, a Boston candy maker, made the first Jellybeans.",
      "Running advertisements across the country, Scrafft urged people to buy jellybeans and send them to soldiers in the Civil War."
  ],
  [
      "The United States produces hundreds of millions of candies for Easter every year.",
      "This production involves 90 million chocolate bunnies, 700 million peeps, and 91.4 billion chocolate eggs."
  ],
  [
      "On average, children in the U.K. receive 8.8 Easter eggs each year.",
      "The number is equivalent to twice the recommended calorie intake for them for an entire week."
  ],
  [
      "Every day, Cadbury produces over 1.5 million Creme Eggs.",
      "The Bournville factory in Birmingham U.K. alone produces at least 500 million pieces per year. When piled on top of each other, that number of eggs would rise higher than Everest."
  ],
  [
      "In some instances, candy sales on the week before Easter are higher than the week before Halloween.",
      "The reason behind this is how Halloween purchases would often spread out over the month rather than what is splurged on the week prior. Still, the two holidays remain tough competitors in having the most candy sales."
  ],
  [
      "PAAS stands as the world’s main supplier of Easter days for more than 135 years now.",
      "Its name originated from ‘Passen,’ the Dutch word for Easter. Founder William Townley learned about it from his Dutch neighbors in Pennsylvania. Now, PAAS retails at least 10 million egg coloring kits each year."
  ],
  [
      "Traditional clothing for Easter includes pastel colors and floral prints.",
      "It signifies the onset of Spring. The trend suggests that people spend around $3.3 billion on Easter clothes."
  ],
  [
      "A traditional feast for Easter include eggs, chocolate, sweet bread, ham, and lamb.",
      "Records show that people spent $5.7 billion on food for Easter."
  ]
];

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: "Get a easter fact.",
      category: "Text",
      options: [
        {
          name: "line",
          description: "The joke number to show.",
          type: 4,
          required: false,
          min_value: 1,
          max_value: facts.length,
        },
      ],
    });
  }

  async run(ctx) {
    const ideaNumber = ctx.args.getInteger('line') ?? (Math.floor(Math.random() * facts.length) + 1);
    ctx.sendMsg(`**Fact ${ideaNumber}/${facts.length}:** ${facts[ideaNumber - 1][0]}\n${facts[ideaNumber-1][1]}`)
  }
};