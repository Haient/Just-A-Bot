const Discord = require("discord.js");
const client = new Discord.Client();
const PREFIX = "-";
const YTDL = require("ytdl-core");
const request = require("request");
const fs = require("fs");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

function play(connection, message) {
	var server = servers[message.guild.id];

	server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

	server.queue.shift();

	server.dispatcher.on("end", function() {
		if (server.queue[0]) play(connection, message);
		else connection.disconnect();
		});
}


client.on("ready", function() {
	console.log("Ready");
	client.user.setGame('-help for info');
});

var servers = {};

client.on("message", function(message) {
	if (message.author.equals(client.user)) return;

    const member = message.member;

	if (!message.content.startsWith(PREFIX)) return;

	var args = message.content.substring(PREFIX.length).split(" ");

	switch (args[0]) {
		case "димон":
		  message.channel.sendMessage("***ДИМООО...***");
		  message.channel.sendMessage("***...ООО...***");
		  message.channel.sendMessage("***...ООО...***");
		  message.channel.sendMessage("***...Н!!***");
		break;

		case "шрек1":
		  message.channel.sendMessage("***-Somebody once told me the world is gonna roll me***")
		  message.channel.sendMessage("***-I ain't the sharpest tool in the shed***")
		  message.channel.sendMessage("***-She was looking kind of dumb with her finger and her***")
		  message.channel.sendMessage("***-Thumb in the shape of an L on her forehead***")
		break;

		case "шрек2":
		  message.channel.sendMessage("***-Hey now you're an All Star get your game on, go play***")
		  message.channel.sendMessage("***-Hey now you're a Rock Star get the show on get paid***")
		  message.channel.sendMessage("***-(And all that glitters is gold)***")
		  message.channel.sendMessage("***-Only shooting stars break the mold***")
		break;

		case "шрек3":
		  message.channel.sendMessage("***-Fuck U***")
		break;

		case "гарри":
		  message.channel.sendMessage("***-БЛЯДЬ, ОН ЁБЕНЫЙ ВОЛШЕБНИК!***")
		  message.channel.sendMessage("***-Стой.***")
		  message.channel.sendMessage("***-МЫ НА ВОШЛЕБНИКА БЛЯТЬ НАПАЛИ!***")
		  message.channel.sendMessage("***ОН... ПОСМОТРИ БЛЯЯЯТЬ!***")
		break;
     
    // Текст который появляеться при неправельном наборе команд
		default:
          var embed = new Discord.RichEmbed()
		  .setColor("#D63232")
		  .setTitle("***ТАКОЙ КОМАНДЫ НЕ СУЩЕСТВУЕТ***")
		  .setFooter("Данный бот находиться в стадии глубокой разработки")
		  .addField("*-help*", "Информация о командах.")
		  .addField("*-димон*", "Добавляет **ДИМОООН**, в Ваше сообщение.")
		  .addField("-шрек(1-2)", "Добавляет **Куплет из песни**, в Ваше сообщение.")
		  .addField("-play (url)", "Проигрывание музыки по ссылке (YouTube).")
		  .addField("-stop", "Остановка музыки.")
		  message.channel.sendEmbed(embed);
        break;

    // Информация о командах Бота
		case "help":
		  var embed = new Discord.RichEmbed()
		  .setColor("#7289DA")
		  .setTitle("**ОСНОВНЫЕ КОМАНДЫ**")
		  .setFooter("Данный бот находиться в стадии глубокой разработки")
		  .addField("*-help*", "Информация о командах.")
		  .addField("*-димон*", "Добавляет **ДИМОООН**, в Ваше сообщение.")
		  .addField("-шрек(1-2)", "Добавляет **Куплет из песни**, в Ваше сообщение.")
		  .addField("-play (url)", "Проигрывание музыки по ссылке (YouTube).")
		  .addField("-skip", "Пропуск трека.")
		  .addField("-stop", "Остановка трека.")
		  message.channel.sendEmbed(embed);
		break;

    // Проигрыватель видео/музыки
		case "play":
		  if (!args[1]) {
		  	message.channel.sendMessage("**Пожалуйста, учажите ссылку на ролик YouTube.**");
		  	return;
		  }

		  if (!message.member.voiceChannel) {
		  	message.channel.sendMessage("**Вы должны находиться в голосовом канале.**");
		  	return;
		  }

		  if (!servers[message.guild.id]) servers[message.guild.id] = {
		  	queue: []
		  }

		  var server = servers[message.guild.id];
          
          server.queue.push(args[1]);

          if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
          	play(connection, message);
          	});
	    break;

		case "skip":
		  var server = servers[message.guild.id];

		  if (server.dispatcher) server.dispatcher.end();
        break;

        case "pause":
		  var server = servers[message.guild.id];

		  if (server.dispatcher) server.dispatcher.pause();
        break;

        case "unpause":
		  var server = servers[message.guild.id];

		  if (server.dispatcher) server.dispatcher.play();
        break;

        case "stop":
          var server = server[message.guild.id];

          if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
        break;
	}
});

function playMusic(id, message){
    voiceChannel = message.member.voiceChannel;    
    voiceChannel.join().then(function (connection){
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: 'audioonly'
    });
        skipReq = 0;
        skippers= [];        
        dispatcher = connection.playStream(stream);
        dispatcher.on('end', function() {
        var queue = [];
        queue.shift();
         if(queue.length == 0) {
            queue = [];
            isPlaying = false;
           } else {
             playMusic(queue[0], message);
            }
        });
    });
}

client.login(process.env.BOT_TOKEN);
