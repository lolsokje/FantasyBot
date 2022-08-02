const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Dunce extends patron.Command {
	constructor() {
		super({
			names: ['dunce'],
			groupName: 'administration',
			description: 'Adds the "dunce" role to a member',
			args: [
				new patron.Argument({
					name: 'user',
					key: 'user',
					type: 'user',
					example: '@FrankyDoodle#1414'
				}),
				new patron.Argument({
					name: 'duration',
					key: 'duration',
					type: 'string',
					example: '1h'
				}),
				new patron.Argument({
					name: 'reason',
					key: 'reason',
					type: 'string',
					example: 'Reposting a tweet without checking',
					remainder: true
				})
			]
		});
	}

	async run(msg, args) {
		const member = msg.guild.members.cache.find(m => m.id === args.user.id);
		const dunceRole = msg.guild.roles.cache.find(r => r.name === 'Dunce');

		const hasRole = await member.roles.cache.find(r => r.name === 'Dunce');

		if (hasRole) {
			await member.roles.remove(dunceRole);

			return msg.sender.reply(`${member.displayName} is no longer a dunce`);
		} else {
			const duration = args.duration;
			const time = duration.replace(/\D/g, '');
			let millis;
			let unit;

			if (duration.includes('s')) {
				millis = time * 1000;
				unit = 'seconds';
			} else if (duration.includes('m')) {
				millis = time * 60000;
				unit = 'minutes';
			} else if (duration.includes('h')) {
				millis = time * 3600000;
				unit = 'hours';
			} else if (duration.includes('d')) {
				millis = time * 86400000;
				unit = 'days';
			} else {
				msg.sender.reply('Please give a valid duration, possibilities; seconds (s), minutes (m), hours (h), days (d)', { color: Constants.standardColors.red });
			}

			await member.roles.add(dunceRole);

			setTimeout(() => {
				member.roles.remove(dunceRole);
			}, millis);

			return msg.sender.reply(`${member.displayName} is now a dunce for ${time} ${unit}. Reason: ${args.reason}`, { color: Constants.standardColors.green });
		}
	}
}

module.exports = new Dunce();
