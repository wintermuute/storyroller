const { prefix } = require('../config.json');
var fs = require('fs');

module.exports = {
	name: 'update',
	description: 'test',
	execute(message, args) {
		message.channel.send("Storyroller successfully updated to display this message!";
	},
};