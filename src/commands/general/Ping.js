const patron = require('patron.js');

class Ping extends patron.Command {
    constructor() {
        super({
            names: ['Ping', 'ping'],
            groupName: 'administration',
            description: 'Play ping-pong'
        });
    }

    async run(msg, args) {
        msg.reply('pong');
    }
}

module.exports = new Ping();
