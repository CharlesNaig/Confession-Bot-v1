
const { token, prefix, guildID, confessionChannelID, logsChannelID, EmbedColor, ThumbnailPicture } = require("./data/config.json");
const { Client, Intents, MessageEmbed, Message, Options } = require('discord.js');
const fs = require("fs")
const keepAlive = require('./data/server.js');
keepAlive();
const bot = new Client({
    makeCache: Options.cacheWithLimits({
        MessageManager: 200, 
        PresenceManager: 0,
    }),
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    intents: ['GUILD_MESSAGES', 'GUILDS', 'GUILD_VOICE_STATES', 'GUILD_MEMBERS', "DIRECT_MESSAGES"],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
    restWsBridgeTimeout: 100
});
bot.once('ready', () => {
    console.log(`Login as ${bot.user.tag}`)

      setInterval(() => {
          const statuses = [
              `Dm me your confession <3`,
              `Confess to someone you love <3`,
          ]
  
          const status = statuses[Math.floor(Math.random() * statuses.length)]
          bot.user.setActivity(status, { type: "WATCHING", url: "https://www.twitch.tv/nocopyrightsounds"})
      }, 20000)
})

bot.on('messageCreate', msg => {
    if (msg.guild) return; 
    if (msg.author.bot) return; 
    const guild = bot.guilds.cache.get(guildID);
    const channel = confessionChannelID;
    const ch = bot.channels.cache.get(channel);
    const logs = bot.channels.cache.get(logsChannelID);
    
    
    fs.readFile("./data/confessions.json", (err, data) => {
        if (err) throw err;
        let dt = JSON.parse(data)
        const em = new MessageEmbed()
            .setTitle(`Anonymous Confession`)
            .setThumbnail(`${ThumbnailPicture}`)
            .setColor(`${EmbedColor}`)
            .setDescription(msg.content)
            .setFooter(`Dm me for your confession | Anonymous Confession #${dt.number}`);
        ch.send({embeds: [em]}).then(message => {
            if (logsChannelID === `${logsChannelID}`) { 
                logs.send({embeds: [em], content: `\`User:\` **${msg.author.tag}**\n\`ID:\` [**${msg.author.id}**]`})
            }
        });
        dt.number += 1
        dt = JSON.stringify(dt, null, 2);
        fs.writeFile("./data/confessions.json", dt, (err) => {
            if (err) throw err;

        });
    });
    msg.channel.send(`📨 **__Your Confession have been send in__** - <#${confessionChannelID}> **\`Please do not send Nonsens confession or message\`**`)
});

bot.login(`${token}`);