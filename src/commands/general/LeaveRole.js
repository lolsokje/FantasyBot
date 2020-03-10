const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class LeaveRole extends patron.Command {
    constructor() {
        super({
            names: ['leave'],
            groupName: 'allpeoplehere',
            description: 'Removes a role from a user',
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
        const role = msg.guild.roles.cache.find(r => r.name === args.role);
        const hasRole = msg.member.roles.cache.find(r => r.name === args.role) !== undefined;

        if (!role) {
            return msg.sender.reply(`Role ${args.role} doesn't exist`, { color: Constants.standardColors.red });
        } else if (Constants.protectedRoles.includes(args.role)) {
            return msg.sender.reply(`Role ${args.role} can't be assigned manually, please contact an Administrator`, { color: Constants.standardColors.red })
        } else if (!hasRole) {
            return msg.sender.reply(`You currently don't have role ${args.role}`);
        } else {
            await msg.member.roles.remove(role);
            return msg.sender.reply(`Role ${args.role} removed from ${msg.member.displayName}`, { color: role.color });
        }
    }
}

module.exports = new LeaveRole();
