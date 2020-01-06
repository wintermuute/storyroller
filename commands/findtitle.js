const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: 'findtitle',
	description: 'Finds as close a match to the given keywords as it can',
	execute(message, args) {
		var booklist = require(fileName);
		
		var titles = "";
		var found = true;
		
		for(var i = 0; i < args.length; i++)
			if(args[i].length < 4)
				args.splice(i, 1);
			
		if(args.length == 0)
		{
			message.channel.send(`Please use a keyword longer than 3 characters.`);
			return;
		}
			
		for(var i = 0; i < booklist.length; i++)
		{
			var lowercaseTitle = booklist[i].title.toLowerCase();

			for(var j = 0; j < args.length; j++)
				if(!lowercaseTitle.includes(args[j].toLowerCase()))
					found = false;
			
			if(found)
			{
				var ownership = "Unowned";
				if(booklist[i].owned == true)
					ownership = "Owned";
				titles += (`${booklist[i].title} (${booklist[i].gameAcronym} V${booklist[i].version}), WW${booklist[i].book}, ${ownership}\n`);
			}
			
			found = true;
		}
		
		if(titles == "")
			message.channel.send(`Sorry, but no books were found.`);
		else
		{
			var titlearr = titles.split('\n');
			var nextTitle = 1;
			titles = `Based on that I found: \n`;
			
			for(var i = 0; i < titlearr.length; i++)
			{
				if(titlearr.length != nextTitle + 1)
					nextTitle++;
				titles += (titlearr[i] + '\n');
				
				if((titles.length + titlearr[nextTitle]) > 2000 || titlearr.length - 1 == i)
				{
					message.channel.send(titles);
					titles = "";
				}
			}
		}
	}
};