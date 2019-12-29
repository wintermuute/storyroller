const { prefix } = require('../config.json');
var fs = require('fs');
var imgPath = './commands/commandmedia/giovanni/';

module.exports = {
	name: 'giovanni',
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