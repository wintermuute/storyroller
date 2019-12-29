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
				
		//searches through booklist, marks any found books as owned
		for(var i = 0; i < booklist.length; i++)
		{
			for(var j = 0; j < args.length; j++)
			{
				if(args[j].toLowerCase() == booklist[i].book.toLowerCase())
				{
					var ownership = "Unowned";
					if(booklist[i].owned == true)
						ownership = "Owned";
					titles += (`${booklist[i].title} (${booklist[i].gameAcronym} V${booklist[i].version}), Status: ${ownership}\n`);
					found = true;
				}
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