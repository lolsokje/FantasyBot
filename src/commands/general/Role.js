const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Role extends patron.Command {
    constructor() {
        super({
            names: ['role'],
            groupName: 'allpeoplehere',
            description: 'Adds or removes a role from a user',
            args: [
                new patron.Argument({
                    name: 'role',
                    key: 'role',
                    type: 'string',
                    example: 'Ferrari'
                })
            ]
        });
    }

    async run(msg, args) {
        const existingRole = msg.guild.roles.cache.find(r => r.name === args.role);

        if (!existingRole) {
            return msg.sender.reply(`Role ${args.role} doesn't exist`, { color: Constants.standardColors.red });
        } else if (msg.member.roles.cache.find(r => r.name === args.role)) {
            await msg.member.roles.remove(existingRole);
            return msg.sender.reply(`Role ${args.role} removed from ${msg.member.displayName}`, { color: existingRole.color });
        } else {
            await msg.member.roles.add(existingRole);
            return msg.sender.reply(`Role ${args.role} added to ${msg.member.displayName}`, { color: existingRole.color });
        }
    }
}

module.exports = new Role();
