const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Mute extends patron.Command {
    constructor() {
        super({
            names: ['mute', 'quiet', 'shut'],
            groupName: 'administration',
            description: 'Mutes a member',
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
                    example: 'Being a twat',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const member = msg.guild.members.find(m => m.id === args.user.id);
        const muteRole = msg.guild.roles.find(r => r.name === 'Muted');

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

        await member.roles.add(muteRole);

        setTimeout(() => {
            member.roles.remove(muteRole);
        }, millis);

        await msg.sender.dm(args.user, `A moderator has muted you for ${time} ${unit}. Reason: ${args.reason}`, { color: Constants.standardColors.blue });
        return msg.sender.reply(`Successfully muted ${member.displayName} for ${time} ${unit}. Reason: ${args.reason}`, { color: Constants.standardColors.green });
    }
}

module.exports = new Mute();
