const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Say extends patron.Command {
    constructor() {
        super({
            names: ['say', 'repeat'],
            groupName: 'allpeoplehere',
            description: 'Literally just repeats your message',
            args: [
                new patron.Argument({
                    name: 'message',
                    key: 'message',
                    type: 'string',
                    example: 'Repeat this',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        return msg.sender.reply(args.message, { color: Constants.standardColors.green });
    }
}

module.exports = new Say();
