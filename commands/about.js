module.exports = {
	name: 'about',
	description: 'Gives an explination of the bot',
	execute(message, args) {
		message.channel.send(
		"This bot is designed to help Storytellers run thier games via Discord.\n" + 
		"It is built using Classic World of Darkness rules.\n" + 
		"Currently, it only rolls d10s and interprets the results, but future goals include:\n" +
		"-Editable character sheets\n" + 
		"-Using character sheets to automatically perform calculations\n" +
		"-Atmosphere management via voice channel\n" +
		"-Ability to define which version to use\n" +
		"-And Many More!(tm)"
		);
	},
};