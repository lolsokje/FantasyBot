const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class AssignRole extends patron.Command {
    constructor() {
        super({
            names: ['join'],
            groupName: 'allpeoplehere',
            description: 'Adds role to user',
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
        const role = msg.guild.roles.cache.find(r => r.name.toLowerCase() === args.role.toLowerCase());
        const hasRole = msg.member.roles.cache.find(r => r.name.toLowerCase() === args.role.toLowerCase()) !== undefined;

        if (!role) {
            return msg.sender.reply(`Role ${args.role} doesn't exist`, { color: Constants.standardColors.red });
        } else if (Constants.protectedRoleIds[role.id] !== undefined) {
            return msg.sender.reply(`Role ${args.role} can't be assigned manually, please contact an Administrator`, { color: Constants.standardColors.red })
        } else if (hasRole) {
            return msg.sender.reply(`You already have role ${args.role}`);
        } else {
            await msg.member.roles.add(role);
            return msg.sender.reply(`Role ${args.role} added to ${msg.member.displayName}`, { color: role.color });
        }
    }
}

module.exports = new AssignRole();
