const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class ListRoleId extends patron.Command {
    constructor() {
        super({
            names: ['roleid'],
            groupName: 'administration',
            description: 'Lists all channel and role ids',
            preconditions: ['Administrator'],
            args: [
                new patron.Argument({
                    name: 'role',
                    key: 'role',
                    type: 'string',
                    example: 'allpeoplehere'
                })
            ]
        });
    }

    async run(msg, args) {
        if (args.role === 'all') {
            const roles = msg.guild.roles.cache;
            let body = '**Roles:**\n\n';

            roles.forEach(role => {
                body += `${role.name}: ${role.id}\n`
            });
            await msg.sender.reply(body);
        } else {
            const role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.role.toLowerCase());

            msg.sender.reply(`${role.name}: ${role.id}`, { color: Constants.standardColors.green });
        }
    }
}

module.exports = new ListRoleId();
