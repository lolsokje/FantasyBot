const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Dunce extends patron.Command {
	constructor() {
		super({
			names: ['undunce', 'ud'],
			groupName: 'administration',
			description: 'Removes the "dunce" role from a member',
			args: [
				new patron.Argument({
					name: 'user',
					key: 'user',
					type: 'user',
					example: '@FrankyDoodle#1414'
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
		}
	}
}

module.exports = new Dunce();
