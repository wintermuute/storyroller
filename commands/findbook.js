const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: 'findbook',
	description: 'Searches for books using White Wolf\'s publication numbers',
	execute(message, args) {
		var booklist = require(fileName);
		
		var titles = "";
		var found = false;
				
		for(var i = 0; i < booklist.length; i++)
		{
			if(args[0].toLowerCase() == booklist[i].book.toLowerCase())
			{
				var ownership = "Unowned";
				if(booklist[i].owned == true)
					ownership = "Owned";
				titles += (`${booklist[i].title} (${booklist[i].gameAcronym} V${booklist[i].version}), Status: ${ownership}\n`);
				found = true;
			}
		}
		
		if(!found)
		{
			message.channel.send(`Sorry, but no books were found.`);
		}
		else
		{
			message.channel.send(`Based on that, I found: \n` + titles);
		}
	}
};