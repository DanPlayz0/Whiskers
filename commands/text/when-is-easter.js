const Command = require('@structures/framework/Command');

const moment = require("moment-timezone");
const timezones = moment.tz.names();

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'How many days until easter?',
      options: [
        {
          type: 3,
          name: "timezone",
          autocomplete: true,
          description: "What timezone should it be displayed in?",
        },
      ],
      category: "Text",
    })
  }

  async run(ctx) {
    const year = new Date().getFullYear(), timezone = ctx.args.getString("timezone") ?? "UTC";
    const current = moment.tz(timezone);

    let easter = moment.tz([year,...getEaster(year),0,0,0], timezone);
    let diffDays = easter.diff(current, 'days');
    if (diffDays < 0) easter = moment.tz([year+1,...getEaster(year+1),0,0,0], timezone);
    diffDays = easter.diff(current, 'days');

    const date = new Date(easter.format()).getTime();
    ctx.sendMsg(diffDays == 0 ? "Easter is **Today**" : `There are **${diffDays}** days until Easter.\nIt will be Easter <t:${Math.round(date / 1000)}:R>`);
  }

  // The function below handles autocomplete options
  async runAutocomplete(ctx) {
    return timezones
      .map((x) => x.toLowerCase())
      .filter((x) => x.includes(ctx.args.getFocused()))
      .slice(0, 25)
      .map((x) => ({ name: x, value: x }));
  }
}

function getEaster(year) {
  let f = Math.floor,
    // Golden Number - 1
    G = year % 19,
    C = f(year / 100),
    // related to Epact
    H = (C - f(C / 4) - f((8 * C + 13)/25) + 19 * G + 15) % 30,
    // number of days from 21 March to the Paschal full moon
    I = H - f(H/28) * (1 - f(29/(H + 1)) * f((21-G)/11)),
    // weekday for the Paschal full moon
    J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7,
    // number of days from 21 March to the Sunday on or before the Paschal full moon
    L = I - J,
    month = 3 + f((L + 40)/44),
    day = L + 28 - 31 * f(month / 4);

  return [month-1,day];
}