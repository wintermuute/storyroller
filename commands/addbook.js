const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: 'addbook',
	description: 'Marks books as read using White Wolf\'s publication numbers',
	execute(message, args) {
		var booklist = require(fileName);
		
		var titles = "";
		var plural = "is";
		var found = false;
				
		var spacer = "";
		//searches through booklist, marks any found books as owned
		for(var i = 0; i < booklist.length; i++)
		{
			for(var j = 0; j < args.length; j++)
			{
				if(args[j] == booklist[i].book)
				{
					if(titles == "")
						spacer = "";
					else if(args.length == 2)
						spacer = " and ";
					else if(args.length > 2 && j != args.length - 1)
						spacer = ", ";
					else
						spacer = ", and ";
					
					booklist[i].owned = true;
					found = true;
					
					titles += (spacer + booklist[i].title);
				}
			}
		}
		
		//Sends appropriate message with proper tense and plurality
		if(args.length > 1)
			plural = "are";
		
		if(!found)
		{
			var tense = "was";
			if(args.length > 1)
				tense = "were";
			if(titles == "")
			{
				titles = "that book";
			}
			message.channel.send(`Sorry, but ${titles} ${tense} not found.`);
		}
		else
		{
			if(titles.length > 1950)
			{
				plural = "are";
				titles = "These books";
			}
			message.channel.send(`${titles} ${plural} now marked as owned.`);
		}
		
		//Updates booklist.json
		fs.writeFile('./booklist.json', JSON.stringify(file, null, 4), function (err) {
			if (err) return console.log(err);
			console.log(JSON.stringify(file, null, 4));
			console.log('Updating ' + fileName);
		});
	}
};