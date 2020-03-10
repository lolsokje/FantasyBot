const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class ListChannelId extends patron.Command {
    constructor() {
        super({
            names: ['channelid'],
            groupName: 'administration',
            description: 'Lists all channel and role ids',
            preconditions: ['Administrator'],
            args: [
                new patron.Argument({
                    name: 'channel',
                    key: 'channel',
                    type: 'string',
                    example: 'robots-and-shitposts'
                })
            ]
        });
    }

    async run(msg, args) {
        const channel = msg.guild.channels.cache.find(c => c.name.toLowerCase() === args.channel.toLowerCase());

        msg.sender.reply(`${channel.name}: ${channel.id}`, { color: Constants.standardColors.green });
    }
}

module.exports = new ListChannelId();
