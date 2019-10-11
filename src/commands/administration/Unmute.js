const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Unmute extends patron.Command {
    constructor() {
        super({
            names: ['unmute'],
            groupName: 'administration',
            description: 'Unmutes a member',
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'user',
                    example: 'FrankyDoodle#1414'
                })
            ]
        });
    }

    async run(msg, args) {
        const member = msg.guild.members.find(m => m.id === args.user.id);
        const role = member.roles.find(r => r.name === 'Muted');

        if (role) {
            await member.roles.remove(role);
            msg.sender.dm(args.user, 'You have been unmuted', { color: Constants.standardColors.green });
            return msg.sender.reply(`Successfully unmuted ${args.user.username}`, { color: Constants.standardColors.green });
        } else {
            return msg.sender.reply(`${args.user.username} isn't currently muted`, { color: Constants.standardColors.red });
        }
    }
}

module.exports = new Unmute();
