module.exports = {
	name: 'roll',
	description: 'Rolls up to 10 d10s for the specified difficulty and interprets the results',
	execute(message, args) {
		
		//limits rolls to 10 d10s
		if(args[0] > 10 || args[0] < 1)
		{
			message.channel.send(`You can only roll between 1 and 10 dice.`);
			return;
		}
		
		//limits difficulty to 3-10, inclusive
		if(args[1] > 10 || args[1] < 3)
		{
			message.channel.send(`Difficulty has to be between 3 and 10, inclusive.`);
			return;
		}
		
		//Rolls the specified number of dice and records each result
		var rolls = [];
		var result = `Rolls: `;
		var passfail = 0;
		
		for (i = 0; i < args[0]; i++)
		{
			rolls[i] = Math.floor((Math.random() * 10) + 1); 
			result += rolls[i];
			if(i != args[0] - 1)
				 result += ', ';
			
			//Calculates success/fail while rolling
			if(rolls[i] >= args[1])
			{
				passfail++;
			}
			else if(rolls[i] <= 1)
			{
				passfail --;
			}
		}
		
		//appends an interpretation of the roll to "result"
		if(passfail >= 1)
		{
			var plural = '';
			if(passfail > 1) { plural = 'es'; }
			result += `\nYou\'ve succeeded with ${passfail} success${plural}!`;
		}
		else if(passfail == 0)
		{
			result += `\nYou've failed!`;
		}
		else
		{
			result += `\n**You've botched!**`;
		}
		
		message.channel.send(result);
	},
};