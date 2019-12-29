const vtmAliases = ["vtm", "vamp", "vampire", "vampire the masquerade", "vampire: the masquerade", "masquerade"];
const koteAliases = ["kote", "kuei jin", "kuei-jin", "cathayan", "kindred of the east"];
const wtaAliases = ["wta", "werewolf", "werewoof", "apocalypse", "gaoru", "fera", "werewolf the apocalypse", "werewolf: the apocalypse"];
const mtaAliases = ["mta", "mage", "ascension", "mage the ascension", "mage: the ascension"];
const wtoAliases = ["wto", "wraith", "oblivion", "wraith the oblivion", "wraith: the oblivion"];
const ctdAliases = ["ctd", "changling", "fae", "the dreaming", "changeling: the dreaming", "changeling the dreaming"];
const htrAliases = ["htr", "hunter", "the reckoning", "hunter the reckoning", "hunter: the reckoning"];
const dtfAliases = ["dtf", "demon", "the fallen", "demon the fallen", "demon: the fallen"];
const davAliases = ["dav", "vtda", "vda", "dark ages", "vampire dark ages", "dark ages vampire", "vampire the dark ages"];
const mtrAliases = ["mtr", "mummy", "resurrection", "mummy the reserrection"];
const orpheusAliases = ["orpheus"];
const wodAliases = ["wod", "cwod", "world of darkness", "darkness"];
const fullGames = ["Vampire: The Masquerade", "Kindred of the East", "Werewolf: The Apocalypse", "Mage: The Ascension", "Wraith: The Oblivion", "Changeling: The Dreaming", "Hunter: The Reckoning", "Demon: The Fallen", "Vampire: The Dark Ages", "Mummy: The Resurrection", "Orpheus", "World of Darkness"];

const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: '%owned',
	description: 'displays the percentage of books owned overall or by game and version',
	execute(message, args) {
		var booklist = require(fileName);
		
		var owned = 0;
		var total = 0;
				
		var game = "";
		var version = 0;
		
		
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
			versionstr = version + " ";
					
		message.channel.send(`You own ${percentage}% (${owned}/${total}) of all ${game}${versionstr} books.`);
			
	}
};