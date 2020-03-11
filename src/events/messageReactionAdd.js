const client = require('../singletons/client');
const Constants = require('../utility/Constants');
const Sender = require('../utility/Sender');
const Embed = require('../utility/Embed');
const registry = require('../singletons/registry');
const { Handler } = require('patron.js');
const handler = new Handler({ registry });

client.on('messageReactionAdd', (messageReaction, user) => {
    (async () => {
        if (user.bot) {
            return;
        }

        const users = await messageReaction.users.fetch();
        const reactedUsers = [];

        users.forEach((user) => {
            reactedUsers.push(user.username);
        });

        if (!reactedUsers.includes('FantasyBot')) {
            return;
        }

        const msg = messageReaction.message;
        const hallOfFameChannel = msg.guild.channels.cache.find(c => c.id === '633598988142116884');
        const robotChannel = msg.guild.channels.cache.find(c => c.id === '515617239521558548');

        if (msg.channel.name !== robotChannel.name) {
            return;
        }

        let upvoteCount = 0;
        let downvoteCount = 0;

        msg.reactions.cache.forEach((reaction) => {
            const msgReaction = msg.reactions.resolve(reaction);
            const emoji = msgReaction.emoji;

            emoji.name === 'upvote' ? upvoteCount = msgReaction.count : downvoteCount = msgReaction.count;
        });

        const requiredUpvotes = downvoteCount + 4;

        if (upvoteCount >= requiredUpvotes) {
            if (msg.attachments.size > 0) {
                const image = msg.attachments.first();

                if (image.url.indexOf('png', image.url.length - 'png'.length) !== 1) {
                    const options = {
                        description: `Submitted by ${msg.member.displayName}`,
                        files: [
                            image.url
                        ],
                        color: Constants.standardColors.blue
                    };
                    await hallOfFameChannel.send({ embed: new Embed(options) });
                    await messageReaction.message.reactions.removeAll();
                }
            }
        }
    })();
});


