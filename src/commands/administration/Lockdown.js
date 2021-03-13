const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Lockdown extends patron.Command {
	constructor() {
		super({
			names: ['lockdown', 'lock'],
			groupName: 'administration',
			description: 'Locks or unlocks a channel',
			preconditions: ['Administrator'],
			botPermissions: ['MANAGE_ROLES'],
			args: [
				new patron.Argument({
					name: 'channel',
					key: 'channel',
					type: 'textchannel',
					example: '#general-discussion'
				})
			]
		})
	}

	async run(msg, args) {
		const channel = args.channel;
		const everyoneRole = await msg.guild.roles.everyone;
		const permissions = await channel.permissionsFor(everyoneRole).toArray();
		const setLocked = permissions.includes('SEND_MESSAGES') ? false : true;

		await channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: setLocked });

		const newType = setLocked === false ? 'locked' : 'unlocked';
		const oldType = setLocked === false ? 'unlock' : 'lock';

		const message = `#${channel.name} is now ${newType}. Run the same command to ${oldType} it.`;

		msg.sender.reply(message, { color: Constants.standardColors.green });
	}
}

module.exports = new Lockdown();
