const client = require('../singletons/client');
const Constants = require('../utility/Constants');
const Sender = require('../utility/Sender');
const patron = require('patron.js');
const registry = require('../singletons/registry');
const { Handler } = require('patron.js');
const handler = new Handler({ registry });

client.on('message', (msg) => {
    (async () => {
        const command = msg.content.split(' ')[0].slice(Constants.prefix.length).toLowerCase();

        if (msg.author.bot === true || Constants.prefixRegex.test(msg.content) === false) {
            return;
        }

        if (Constants.allowedChannelIds[msg.channel.id] === undefined
            && !msg.member.permissions.has('ADMINISTRATOR')
            && !Constants.whitelistedCommands.includes(command)) {
            return;
        }

        msg.sender = new Sender(msg);

        const result = await handler.run(msg, Constants.prefix.length);

        if (result.success === false) {
            let message;

            if (result.commandError === patron.CommandError.InvalidArgCount) {
                message = "You need to provide all required arguments";

				return msg.sender.reply(message, { color: '0xFF0000'});
            }
        }
    })();
});
