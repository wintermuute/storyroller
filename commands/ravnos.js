const { prefix } = require('../config.json');

module.exports = {
	name: 'ravnos',
	description: 'joaks',
	execute(message, args) {
		message.channel.send('http://antigypsyism.eu/wp-content/uploads/2017/07/Antigypsyism-reference-paper-16.06.2017.pdf');
	},
};