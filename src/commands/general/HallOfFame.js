const patron = require('patron.js');
const Constants = require('../../utility/Constants');
const Embed = require('../../utility/Embed');

class HallOfFame extends patron.Command {
    constructor() {
        super({
            names: ['submit', 'halloffame'],
            groupName: 'allpeoplehere',
            description: 'Submits a quote or image to the hall-of-fame channel',
            args: [
                new patron.Argument({
                    name: 'submission',
                    key: 'submission',
                    type: 'string',
                    defaultValue: '',
                    example: 'Either a normal quote, or an image',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const hallOfFameChannel = msg.guild.channels.find(c => c.name === 'hall-of-fame');

        if (msg.attachments.size === 0) {
            return hallOfFameChannel.send(`${args.submission}`, { color: Constants.standardColors.blue })
        } else {
            const image = msg.attachments.first();

            if (image.url.indexOf('png', image.url.length - 'png'.length) !== 1) {
                const options = {
                    description: `Submitted by ${msg.member.displayName}`,
                    files: [
                        image.url
                    ],
                    color: Constants.standardColors.blue
                };
                return hallOfFameChannel.send({ embed: new Embed(options) });
            }
        }
    }
}

module.exports = new HallOfFame();
