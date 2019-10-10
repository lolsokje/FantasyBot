const patron = require('patron.js');

class Roles extends patron.Command {
    constructor() {
        super({
            names: ['roles', 'myroles', 'listroles'],
            groupName: 'allpeoplehere',
            description: 'Lists all roles for the user'
        });
    }

    async run(msg) {
        let message = `**Roles for ${msg.member.displayName}:**\n\n`;

        const roles = await msg.member.roles;

        roles.forEach(role => message += `${role.name}\n`);

        return msg.sender.reply(message, { color: msg.member.displayColor });
    }
}

module.exports = new Roles();
