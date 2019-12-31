const fs = require('fs');
const jsonfile = require('jsonfile');
var fileName = '../booklist.json';
var file = require(fileName);

module.exports = {
	name: 'any%',
	description: 'lists the percentages owned of every possible category',
	execute(message, args) {
		var booklist = require(fileName);
		
		const fullGames = ["Vampire: The Masquerade", "Kindred of the East", "Werewolf: The Apocalypse", "Mage: The Ascension", "Wraith: The Oblivion", "Changeling: The Dreaming", "Hunter: The Reckoning", "Demon: The Fallen", "Vampire: The Dark Ages", "Mummy: The Resurrection", "Orpheus", "World of Darkness"];
		const fullAcronyms = ["VTM", "KotE", "WTA", "MTA", "WTO", "CTD", "HTR", "DTF", "VTDA", "MTR", "Orpheus", "WoD"];
		var totalsList = new Array(fullGames.length);
		var ownedList = new Array(fullGames.length);
		
		for(var i = 0; i < totalsList.length; i++)
		{
			totalsList[i] = new Array(3);
			ownedList[i] = new Array(3);
		}
		
		for(var i = 0; i < totalsList.length;i++)
		{
			for(var j = 0; j < totalsList[0].length; j++)
			{
				totalsList[i][j] = 0;
				ownedList[i][j] = 0;
			}
		}
		
		//Scans through booklist and counts up how many books of each game version are owned, along with the total count
		var currGame = 0;
		
		for(var i = 0; i < booklist.length; i++)
		{
			if(booklist[i].game != fullGames[currGame])
			{
				while(fullGames[currGame] != booklist[i].game)
				{	
					if(currGame == fullGames.length - 1)
					{
						currGame = -1;
					}
					currGame++;
				}
			}
			
			totalsList[currGame][booklist[i].version] += 1;
			if(booklist[i].owned)
			{
				ownedList[currGame][booklist[i].version - 1] += 1;
			}
		}
		
		
		//Calculates percentages and compiles them into a message
		var totalBooks = 0;
		var totalOwned = 0;
		
		var verOwned = new Array(totalsList[0].length);
		var verTotal = new Array(totalsList[0].length);
		
		var finalMessage = "";
		
		for(var i = 0; i < totalsList.length; i++)
		{
			var gameTotalOwned = 0;
			var gameTotalPrinted = 0;
			var versionBreakdown = new Array(totalsList[0].length);
			
			for(var j = 0; j < totalsList[0].length; j++)
			{
				totalOwned += ownedList[i][j];
				totalBooks += totalsList[i][j];
				
				verTotal[j] += totalsList[i][j];
				verOwned[j] += ownedList[i][j];
				
				gameTotalOwned += ownedList[i][j];
				gameTotalPrinted += totalsList[i][j];
				
				var percentage = ((ownedList[i][j]/totalsList[i][j]) * 100).toFixed(2);
				
				versionBreakdown[j] = `${fullAcronyms[i]} V${j + 1}: ${percentage}% (${ownedList[i][j]}/${totalsList[i][j]})` + "\n";
			}
			
			if(finalMessage.length > 1750)
			{
				message.channel.send(finalMessage);
				finalMessage = "";
			}
			
			finalMessage += `You own ${((gameTotalOwned / gameTotalPrinted) * 100).toFixed(2)}% (${gameTotalOwned}/${gameTotalPrinted}) of all ${fullGames[i]} books.` + "\n" + "\n"; 
			
			for(var j = 0; j < versionBreakdown.length; j++)
			{
				finalMessage += versionBreakdown[j];
			}
			finalMessage += "\n";
		}
		
		for(var i = 0; i < verOwned.length; i++)
		{
			finalMessage += "\n" + `You own ${((verOwned[i]/verTotal[i]) * 100).toFixed(2)}% (${verOwned[i]}/${verTotal[i]}) of all V${i + 1} books.` + "\n";
		}
		
		finalMessage += "\n" + `Overall, you own ${((totalOwned/totalBooks) * 100).toFixed(2)}% (${totalOwned}/${totalBooks}) of all CWoD books.`;
					
		message.channel.send(finalMessage);
			
	}
};