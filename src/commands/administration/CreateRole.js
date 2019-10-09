const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class CreateRole extends patron.Command {
    constructor() {
        super({
            names: ['createrole', 'addrole'],
            groupName: 'administration',
            description: 'Create a new user role',
            preconditions: ['Administrator'],
            botPermissions: ['MANAGE_ROLES'],
            args: [
                new patron.Argument({
                    name: 'role', 
                    key: 'role',
                    type: 'string',
                    example: 'DeeF1'
                }),
                new patron.Argument({
                    name: 'color',
                    key: 'color',
                    type: 'color',
                    example: '004225'
                })
            ]
        });
    }

    async run(msg, args) {
        const existingRoles = msg.guild.roles.find(r => r.name === args.role);

        if (existingRoles) {
            msg.reply(`Role ${args.role} already exists`);
        } else {
            msg.reply(`Let's create this role`);
        }
    }
}

module.exports = new CreateRole();
