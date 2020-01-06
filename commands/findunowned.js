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
	name: 'findunowned',
	description: 'displays all books that are marked as unowned',
	execute(message, args) {
				var booklist = require(fileName);
		
		var titles = "";
				
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
		
		if(!fullGames.includes(game) && !game == "")
		{
			console.dir("findgame.js attempted input: " + game)
			message.channel.send("Please enter a proper game acronym");
			return;
		}
		
		for(var i = 0; i < booklist.length; i++)
		{
			if(!booklist[i].owned)
				if(game == booklist[i].game || game == "")
					if(booklist[i].version == version || version == 0)
						titles += (`${booklist[i].title} (${booklist[i].gameAcronym} V${booklist[i].version}),  WW${booklist[i].book}\n`);
		}
		
		if(titles == "")
			message.channel.send(`Sorry, but no books were found.`);
		else
		{
			var titlearr = titles.split('\n');
			var nextTitle = 1;
			titles = `Your current collection is missing: \n`;
			
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