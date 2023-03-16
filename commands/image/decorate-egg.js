const Command = require('@structures/framework/Command');

module.exports = class extends Command {
  constructor(client) {
    super(client, {
      enabled: true,
      description: 'Decorate an egg',
      options: [],
      category: "Image",
      enabled: false,
    })
  }

  async run(ctx) {
  }

  // The function below handles autocomplete options
  async runAutocomplete(ctx) {
    
  }
}