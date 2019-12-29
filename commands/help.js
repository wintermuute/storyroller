const { prefix } = require('../config.json');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	execute(message, args) {
		
		var helpmessage = 
		"**%owned [game] [version]:** displays the percentage of games owned overall, for a specific game, or for a specific game verison.\n" + 
		"**about:** tells you about the bot.\n" +
		"**addbook [XXXX] [XXXX] ...:** Marks books as read using their Publication Numbers.\n" + 
		"**findbook [XXXX] [XXXX]...:** Lists information a book using its Publication Number.\n" + 
		"**findgame [acronym] [version]:** Lists all books from a specified game, or from a specified game version, using the game's acronym.\n" +
		"**findowned [acronym] [version]:** lists all books currently marked as owned, with the ability to filter by game and game version.\n" + 
		"**findtitle [keyword] [keyword]...:** finds books by keywords in their titles.\n" + 
		"**help:** displays this message.\n" + 
		"**removebook [XXXX] [XXXX]...:** Marks books as unowned using their Publication Numbers.\n" + 
		"**roll [number of d10s] [difficulty]:** rolls the given number of dice at the given difficulty, and then displays and interpreits the roll."
		
		message.channel.send(helpmessage);
	},
};