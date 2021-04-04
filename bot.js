//Initialization
const Discord = require('discord.js');
const bot = new Discord.Client();
const Token = require("./auth.json").token;
const {Player} = require('discord-player');

//Songlist
var songs = [];
songs = require('./music.js').songs;
//Prefix for commands.
var Prefix = "!";
bot.player = new Player(bot);
bot.player.on('trackStart', (message, track) => message.channel.send(`Now playing ${track.title}...`));

//When bot is ready to go.
bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  bot.user.setActivity("Go harass @Crilluz#6969 if something's wrong, or harass him even if nothing's wrong. Just go harass him"); 
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
        case ("r"):
        case("roll"):
            //Only accept the command if it has !roll and a number
            if(m.length < 2){return;}
            var roll = `:game_die: You rolled: `;
            if(m.length == 3)
            {
                if(parseInt(m[2]) > 100){return;}
                for(var i = 0; i<parseInt(m[2]); i++)
                {
                    roll += ` ${Math.floor(Math.random() * parseInt(m[1]))+1} `;
                }
            }
            else
            {
                roll += ` ${Math.floor(Math.random() * parseInt(m[1]))+1}`;
            }
            msg.channel.send(roll);
            break;
        case("nwordcount"):
                //foreach instance of "nigga" or "nigger", add one for the mentioned user (args[1]) and output the amount of n-words said.
                //TODO: Search for individual words said by person.
                //Search should be: from:@mentionedUser#6969 nword1
                //from:user in:channel apples
            break;
        case ("help"):
                msg.channel.send(`!roll {dX} {no. dice} (1 if blank) - Rolls a die. !music gives you good songs.`);
            break;
        case ("drip"):
            msg.channel.send("Initiating Drip");
            bot.player.play(message, "attack on drip song", true);
            // then we play some drip songs idonno
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
