const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: 'any%',
	description: 'lists the percentages owned of every possible category',
	execute(message, args) {
		var booklist = require(fileName);
		
		var owned = 0;
		var total = 0;
				
		var game = "";
		var version = 0;
		
		const fullGames = ["Vampire: The Masquerade", "Kindred of the East", "Werewolf: The Apocalypse", "Mage: The Ascension", "Wraith: The Oblivion", "Changeling: The Dreaming", "Hunter: The Reckoning", "Demon: The Fallen", "Vampire: The Dark Ages", "Mummy: The Resurrection", "Orpheus", "World of Darkness"];
		
		if(args.length > 0)
			game = args[0].toLowerCase();
		if(args.length > 1)
			version = args[1];
			
		//Converts game acronyms to full game names
		if(vtmAliases.includes(game))
			game = "Vampire: The Masquerade";
		else if (koteAliases.includes(game))
			game = "Kindred of the East";
		else if(wtaAliases.includes(game))
			game = "Werewolf: The Apocalypse";
		else if(mtaAliases.includes(game))
			game = "Mage: The Ascension";
		else if(wtoAliases.includes(game))
			game = "Wraith: The Oblivion";
		else if(ctdAliases.includes(game))
			game = "Changeling: The Dreaming";
		else if(htrAliases.includes(game))
			game = "Hunter: The Reckoning";
		else if(dtfAliases.includes(game))
			game = "Demon: The Fallen";
		else if(davAliases.includes(game))
			game = "Vampire: The Dark Ages";
		else if(mtrAliases.includes(game))
			game = "Mummy: The Resurrection";
		else if(orpheusAliases.includes(game))
			game = "Orpheus";
		else if (wodAliases.includes(game))
			game = "World of Darkness";
		
		for(var i = 0; i < booklist.length; i++)
		{
			if(booklist[i].game == game || game =="")
				if(booklist[i].version == version || version == 0)
					if(booklist[i].owned)
					{	
						owned++;
						total++;
					}
					else
						total++;
			
						
		}
		
		var percentage = (owned / total) * 100;
					
		percentage = percentage.toFixed(2);
		
		var versionstr = "";
		
		if(game != "")
			game += " ";
		if(version != 0)
			versionstr = "V" + version + " ";
					
		message.channel.send(`You own ${percentage}% (${owned}/${total}) of all ${game}${versionstr} books.`);
			
	}
};