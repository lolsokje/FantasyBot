const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class DeleteRole extends patron.Command {
    constructor() {
        super({
            names: ['deleterole', 'removerole', 'avadakedavra', 'fetusdeletus'],
            groupName: 'administration',
            description: 'Removes a user role',
            preconditions: ['Administrator'],
            botPermissions: ['MANAGE_ROLES'],
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

        if (!role) {
            return msg.sender.reply(`Can't find role ${args.role}`, { color: Constants.standardColors.red });
        } else if (Constants.permanentRoleIds[role.id] !== undefined) {
            return msg.sender.reply(`Role ${args.role} can't be removed`, { color: Constants.standardColors.red });
        } else {
            await role.delete();
            return msg.sender.reply(`Removed role ${args.role}`, { color: Constants.standardColors.green });
        }
    }
}

module.exports = new DeleteRole();
