const patron = require('patron.js');
const Constants = require('../../utility/Constants');
const Embed = require('../../utility/Embed');

class HallOfFame extends patron.Command {
    constructor() {
        super({
            names: ['submittest', 'halloffame'],
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
        const upvoteEmote = msg.guild.emojis.find(e => e.name === 'upvote');
        const downvoteEmote = msg.guild.emojis.find(e => e.name === 'downvote');

        await msg.react(upvoteEmote);
        await msg.react(downvoteEmote);
    }
}

module.exports = new HallOfFame();
