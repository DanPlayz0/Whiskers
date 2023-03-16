module.exports = {
  token: "DISCORD_BOT_TOKEN",

  // Set 'redis.host' to null to disable the Redis connection.
  // Currently disabled
  redis: {
    host: "localhost",
    port: 6379,
  },

  // Set 'restapi.port' to null to disable the REST API.
  restapi: {
    port: 3000,
  },

  webhooks: {
    shard: { id: "", token: "" },
    error: { id: "", token: "" },
    command: { id: "", token: "" },
    guilds: { id: "", token: "" },
  }
}