const patron = require('patron.js');

class Administrator extends patron.Precondition {
    constructor() {
        super({
            name: 'Administrator'
        });
    }

    async run(command, msg) {
        if (msg.member.hasPermission('ADMINISTRATOR')) {
            return patron.PreconditionResult.fromSuccess();
        }

        return patron.PreconditionResult.fromError(command, 'Only Administrators can run this command');
    }
}

module.exports = new Administrator();
