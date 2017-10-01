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

	client.on('messege', async msg => {
		if (msg.author.bot) return undefined;
		if (!msg.content.startsWitch(PREFIX)) return undefined;
		const args = msg.content.split(' ');
		const serverQueue = queue.get(msg.guild.id);
		
		if (msg.content.startsWitch(`${PREFIX}play`)) {
			const voiceChannel = msg.member.voiceChannel;
			if (!voiceChannel) return msg.channel.send("Вам нужно находиться в голосовом канале!");
			const permissions = voiceChannel.permissionsFor(msg.client.user);
			if (!permissions.has('CONNECT')) {
				return msg.channel.send("Я не могу подключиться к этому каналу!");
			}
			if (!permissions.has('SPEAK')) {
				return msg.channel.send("Я не могу говорить в этом канале!");
			}
			
			const songInfo = await ytdl.getInfo(args[1]);
			const song = {
				title: songInfo.title,
				url: songInfo.video_url
			};
			if (!serverQueue) {
				const queueConstruct = {
					textChannel: msg.channel,
					voiceChannel: voiceChannel,
					connection: null,
					songs: [],
					volume: 5,
					playing: true
				};
				queue.set(msg.guild.id, queueConstruct);
				
				try {
				var connection = await voiceChannel.join();
			      } catch (error) {
				console.error(`Я не могу подключиться к голосовому каналу: ${error}`);
				return msg.channel.send(`Я не могу подключиться к голосовому каналу: ${error}`);
			      }
	         	} else {
				
			}
			
			const dispatcher = connection.playStream(ytdl(args[1]))
			.on('end', () => {
				console.log('музыка закончилась:');
				voiceChannel.leave();
			})
			.on('error', error => {
				console.error(error);
			});
		       dispatcher.setVolumeLogaritmic(5 / 5);
		} else if (msg.content.startsWitch(`${PREFIX}stop`)) {
			if (!msg.member.voiceChannel) return msg.channel.send("Вы не в голосовом канале!");
			msg.member.voiceChannel.leave();
	
	
client.login(process.env.BOT_TOKEN);
