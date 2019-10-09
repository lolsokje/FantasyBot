const client = require('../singletons/client');
const Constants = require('../utility/Constants');
const registry = require('../singletons/registry');
const { Handler } = require('patron.js');
const handler = new Handler({registry});

client.on('message', (msg) => {
    (async () => {
        if (msg.author.bot) {
            return;
        }

        const inGuild = msg.guild !== null;

        if (inGuild) {
            msg.member = msg.member !== null ? msg.member : await msg.guild.fetchMember(msg.author);
        }
        
        const result = await handler.run(msg, Constants.prefix.length);

        if (result.success === false) {
            // TODO error handling
        }
    })();
});
