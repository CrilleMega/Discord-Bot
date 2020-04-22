const Discord = require('discord.js');
const bot = new Discord.Client();
const Token = require("./auth.json").token;
var songs = [];
songs = require('./music.js').songs;
console.log(songs);
console.log(songs.length);

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Headbanging to hardstyle."); 
});

bot.on('message', msg => {
    if(msg.author.bot){return;}
    var m = msg.content.toLowerCase();
  if (m.includes('hardstyle', 0) || m.includes('music', 0))
  {
    if(m.includes("plz", 0)  || m.includes('pls', 0) || m.includes("please", 0))
    {
    msg.reply(`${songs[Math.floor(Math.random() * songs.length)]}`);
  }
}
  if (m.includes("good bot", 0))
  {
    msg.reply("<3");
  }
  else if (m.includes("bad bot", 0))
  {
    msg.reply(":(");
  }
  else if(m.includes("retard bot", 0))
  {
    msg.reply(";-; What did I do wrong?");
  }

});

bot.login(Token);
