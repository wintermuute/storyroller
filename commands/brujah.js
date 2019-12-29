const { prefix } = require('../config.json');
var fs = require('fs');
var imgPath = './commands/commandmedia/brujah/';

module.exports = {
	name: 'brujah',
	description: 'joaks',
	execute(message, args) {
		var imgList = [];
		
		fs.readdirSync(imgPath).forEach(file => {
			imgList.push(file);
		});
		
		var randImg = Math.floor(Math.random() * imgList.length); 
		
		message.channel.send({files: [imgPath + imgList[randImg]]});
	},
};