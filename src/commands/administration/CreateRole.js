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
                }),
                new patron.Argument({
                    name: 'pingable',
                    key: 'pingable',
                    type: 'string',
                    defaultValue: '',
                    example: 'true'
                })
            ]
        });
    }

    async run(msg, args) {
        const existingRoles = msg.guild.roles.find(r => r.name === args.role);

        if (existingRoles) {
            return msg.sender.reply(`Role ${args.role} already exists`, { color: Constants.standardColors.red });
        } else {
            const newRole = await msg.guild.roles.create({
                data: {
                    name: args.role,
                    color: args.color
                }
            });
            const allpeoplhere = await msg.guild.roles.find(r => r.name === 'allpeoplehere');

            if (args.pingable !== '') {
                newRole.setMentionable(true);
            } else {
                await newRole.setPosition(allpeoplhere.position);
            }

            return msg.sender.reply(`Role ${args.role} created`, { color: args.color });
        }
    }
}

module.exports = new CreateRole();
