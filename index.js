const { ShardingManager } = require('discord.js');
const config = require('./config.js');
let manager;

try {
  manager = new ShardingManager('./bot.js', { totalShards: 'auto', token: config.token });
  manager.on('shardCreate', (shard) => console.log(`Shard ${shard.id} launched`));
  manager.spawn();
} catch (e) {
  console.log(`Can't create manager`);
  console.log(e);
  process.exit(1);
}

process.on('SIGINT', () => {
  manager.broadcastEval((c)=>c.stop())
  process.exit(0);
})
process.on('SIGTERM', () => {
  manager.broadcastEval((c)=>c.stop())
  process.exit(0);
})