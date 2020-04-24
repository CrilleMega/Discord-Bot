//Initialization
const Discord = require('discord.js');
const bot = new Discord.Client();
const Token = require("./auth.json").token;

//Songlist
var songs = [];
songs = require('./music.js').songs;
//Prefix for commands.
var Prefix = "!";

//When bot is ready to go.
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Headbanging to hardstyle."); 
});

//If a message got sent in the channel.
bot.on('message', msg => 
{
    //If a bot sent the message, ignore it.
    if(msg.author.bot){return;}
    //Put the message in lowercase so that it registers the command.
    var m = msg.content.toLowerCase()
    //Commands without prefix.
    if (m.includes("good bot", 0))
      {
        msg.reply("<3");
      }
      else if (m.includes("bad bot", 0))
      {
        msg.reply(";-;");
      }

    //If the command has a prefix (!), check the command.
    try {
      //cut out the prefix and split the string into an array.
      //!roll 20 becomes {"roll", "20"}, where m[0] is "roll", and m[1] is "20", etc.
      m = m.substring(Prefix.length).split(" ");
      //m[0] is the command directly after the prefix. Switch checks if any of these fits.
      switch(m[0])
      {
        //Send music
        case("music"):
            //pick a random song from the array imported from music.js
            msg.channel.send(`${songs[Math.floor(Math.random() * songs.length)]}`);
            break;
        //Roll a die.
        case("roll"):
            //Only accept the command if it has !roll and a number
            if(m.length != 2){return;}
            msg.channel.send(`:game_die: You rolled: ${Math.floor(Math.random() * parseInt(m[1]))+1}`);
            break;
      }
  }
  catch(error)
  {
    console.log(error);
  }
});

//Login with the bot.
bot.login(Token);