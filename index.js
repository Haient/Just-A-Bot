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

///////// Статус Бота /////////////////////////////////////////////////////////////////////////////////////

  client.on("ready", function() {
	  console.log("Ready");
	  client.user.setPresence({ game: { name: '-help', type: 3 } })
});

var servers = {};

client.on("message", function(message) {
	if (message.author.equals(client.user)) return;

    const member = message.member;

	if (!message.content.startsWith(PREFIX)) return;

	var args = message.content.substring(PREFIX.length).split(" ");

	switch (args[0]) {

///////// Фановые команды /////////////////////////////////////////////////////////////////////////////////

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

        case "легушка":
        var embed = new Discord.RichEmbed()
          .setColor("#007600")
          .setImage("https://i.imgur.com/r6xmLr1.gif")
          .setThumbnail("https://i.imgur.com/r6xmLr1.gif")
          .setFooter("Туц туц туц" ,"https://i.imgur.com/r6xmLr1.gif")
          .setAuthor("Туц туц туц" ,"https://i.imgur.com/r6xmLr1.gif")
        message.channel.sendEmbed(embed);
        break;
			
///////// Уроки польского языка ///////////////////////////////////////////////////////////////////////////

        case "алфавит":
         message.delete();
        var embed = new Discord.RichEmbed()
	    .setAuthor("Polish", "https://i.imgur.com/xlGU7St.png")
          .setColor("#ffffff")
          .setFooter("Следующая страница <<-polish1>>")
          .setImage("https://i.imgur.com/0pz3Wd4.jpg")
        message.channel.sendEmbed(embed);
        break;

		case "polish1":
	  var embed = new Discord.RichEmbed()
	    .setAuthor("Polish", "https://i.imgur.com/xlGU7St.png")
		 .setColor("#ffffff")
		  .setTitle("**ПОЛЬСКИЕ БУКВОСОЧЕТАНИЯ**")
		   .setFooter("Следующая страница <<-polish2>>")
		  .addField("Буквосочетания: Ch", "Транскрипция: **Х**")
		  .addField("Буквосочетания: Rz", "Транскрипция: **Ж**")
	      .addField("Буквосочетания: Dz", "Транскрипция: **Дз**")
		  .addField("Буквосочетания: Dź", "Транскрипция: **Джь**")
		  .addField("Буквосочетания: Dż", "Транскрипция: **Дж**")
		  .addField("Буквосочетания: Sz", "Транскрипция: **Ш**")
		  .addField("Буквосочетания: Cz", "Транскрипция: **Ч**")
	      .addField("Буквосочетания: SzCz", "Транскрипция: **Щ**")
		  message.channel.sendEmbed(embed);	
                break;

        case "polish2":
	  var embed = new Discord.RichEmbed()
	    .setAuthor("Polish", "https://i.imgur.com/xlGU7St.png")
		 .setColor("#ffffff")
		  .setTitle("**ЧАСТО ИСПОЛЬЗУЕМЫЕ СЛОВА**")
		   .setFooter("Следующая страница <<-polish3>>")
		  .addField("Слово: Przepraszam", "Перевод: **Прошу прощения**")
		  .addField("Слово: Dzień dobry", "Перевод: **Добрый день**")
	      .addField("Слово: Dziękuję", "Перевод: **Спасибо**")
		  .addField("Слово: Dobranoc", "Перевод: **Спокойной ночи**")
		  .addField("Слово: Prosze", "Перевод: **Пожалуйста**")
		  .addField("Слово: Część", "Перевод: **Привет/Пока**")
		  .addField("Слово: Dobrze", "Перевод: **Хорошо**")
	      .addField("Слово: Pewnie", "Перевод: **Конечно**")
	      .addField("Слово: Tak", "Перевод: **Да**")
	      .addField("Слово: Nie", "Перевод: **Нет**")
		  message.channel.sendEmbed(embed);	
                break;

        case "polish3":
	  var embed = new Discord.RichEmbed()
	    .setAuthor("Polish", "https://i.imgur.com/xlGU7St.png")
		 .setColor("#ffffff")
		  .setTitle("**ЧАСТО ИСПОЛЬЗУЕМЫЕ СЛОВА**")
		   .setFooter("Следующая страница <<-polish4>>")
		  .addField("Слово: Сo tam u ciebie?", "Перевод: **Как у тебя дела?**")
		  .addField("Слово: Оdpoczywać", "Перевод: **Отдхыть**")
	      .addField("Слово: Miłość", "Перевод: **Любовь**")
		  .addField("Слово: Sklep", "Перевод: **Магазин**")  
		  .addField("Слово: Błąd", "Перевод: **Ошибка**")
		  .addField("Слово: Jutro", "Перевод: **Завтра**")
		  .addField("Слово: Tydzień", "Перевод: **Неделя**")
	      .addField("Слово: Dzisiaj", "Перевод: **Сегодня**")
	      .addField("Слово: Wczoraj", "Перевод: **Вчера**")
	      .addField("Слово: Bardzo", "Перевод: **Очень**")
		  message.channel.sendEmbed(embed);	
                break;

        case "polish4":
	  var embed = new Discord.RichEmbed()
	    .setAuthor("Polish", "https://i.imgur.com/xlGU7St.png")
		 .setColor("#ffffff")
		  .setTitle("**ЧАСТО ИСПОЛЬЗУЕМЫЕ СЛОВА**")
		   .setFooter("Следующая страница <<-polish5>> **(ожидаеться в версии 0.9)**")
		  .addField("Слово: Jeden", "Перевод: **Один**")
		  .addField("Слово: Dwa", "Перевод: **Два**")
	      .addField("Слово: Trzy", "Перевод: **Три**")
		  .addField("Слово: Cztery", "Перевод: **Четыре**")  
		  .addField("Слово: Pięć", "Перевод: **Пять**")
		  .addField("Слово: Sześć", "Перевод: **Шесть**")
		  .addField("Слово: Siedem", "Перевод: **Семь**")
	      .addField("Слово: Osiem", "Перевод: **Восемь**")
	      .addField("Слово: Dziewięć", "Перевод: **Девять**")
	      .addField("Слово: Dziesięć", "Перевод: **Десять**")
		  message.channel.sendEmbed(embed);	
                break;                
     
///////// Текст который появляеться при неправельном наборе команд ////////////////////////////////////////

		default:
		 message.delete();
          var embed = new Discord.RichEmbed()
		  .setColor("#D63232")
		  .setTitle("***ТАКОЙ КОМАНДЫ НЕ СУЩЕСТВУЕТ***")
		  .setFooter("Данный бот находиться в стадии глубокой разработки | Версия бота: 0.8.34")
		  .addField("*-help*", "Информация о командах.")
		  message.channel.sendEmbed(embed);
        break;

///////// Информация о фановых командах Бота //////////////////////////////////////////////////////////////////////

		case "fun":
		 message.delete();
		  var embed = new Discord.RichEmbed()
		  .setAuthor("Фановые команды бота Just a Test Bot", "https://i.imgur.com/1MR95h8.png")
		  .setColor("#7289DA")
		  .setTitle("**ФАНОВЫЕ КОМАНДЫ**")
		  .setFooter("Данный бот находиться в стадии глубокой разработки | Версия бота: 0.8.34")
		  .addField("-димон", "Добавляет ДИМОООооона в чат.")
          .addField("-шрек(1/2)", "Це моє болотоб, друже.")
		  .addField("-гарри", "БЛЯТЬ, ДА ОН ЕБАНЫЙ ВОЛШЕБНИК!")
		  .addField("-легушка", "Ква, ква.")
		  message.channel.sendEmbed(embed);
		break;

///////// Информация о командах Бота //////////////////////////////////////////////////////////////

		case "help":
		 message.delete();
		  var embed = new Discord.RichEmbed()
		  .setAuthor("Команды бота Just a Test Bot", "https://i.imgur.com/1MR95h8.png")
		  .setColor("#7289DA")
		  .setTitle("**ОСНОВНЫЕ КОМАНДЫ**")
		  .setFooter("Данный бот находиться в стадии глубокой разработки | Версия бота: 0.8.34")
		  .addField("-help", "Информация о командах.")
          .addField("-fun", "Список команд, созданных для фана.")
		  .addField("-new", "Список обновлений бота.")
		  .addField("-play (url)", "Проигрывание музыки по ссылке (YouTube).")
		  .addField("-skip", "Пропуск трека.")
		  .addField("-stop", "Остановка трека.")
		  .addField("-polish(1-4)", "Сноска для изучения польского языка.")
		  message.channel.sendEmbed(embed);
		break;

///////// Обновления бота /////////////////////////////////////////////////////////////////////////////////

		case "new":
		  var embed = new Discord.RichEmbed()
		  .setAuthor("Настало время обновлений", "https://i.imgur.com/uJprplj.png")
		  .setColor("#F59B00")
		  .setTitle("**СПИСОК ИЗМЕНЕНИЙ В ВЕРСИИ 0.8.3**")
		  .setFooter("Последнее обновление: 05.03.2018 10:00 (UTC+3) | Версия бота: 0.8.34")
		  .addField("Мы добавили больше команд", "Теперь в боте, есть еще больше разных плюшек, которыми можно баловаться. *Не забывайте про -help.*")
		  .addField("Добавлена сноска польского языка", "Это сделано для тех, кто хочет, выучить язык и поиграть в оригинальной озвучке в The Witcher 3.")
		  .addField("Оптимизирована работа бота", "Меньше лагов - больше веселья и возможностей.")
		  .addField("Теперь мы ведем DEV-LOG", "Наконец-то вы сможете следить за новыми обновлениями.")
		  .addField("Теперь бот по настоящему Смотрит", "Мы сделали боту глаз что бы он мог смотреть на список команд *(-help)*.")
		  .addField("Был добавлен Вебхук для YouTube", "Это никак не связано с ботом, но теперь можно сделить за своими любимыми ютуберами не выходя из Discord.")
		  .addField("Мелкие фиксы и дополнения", "Они настолько маленькие, что их сложно заметить.")
		  message.channel.sendEmbed(embed);
		break;

///////// Проигрыватель видео/музыки //////////////////////////////////////////////////////////////////////

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
          var server = servers[message.guild.id];

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
