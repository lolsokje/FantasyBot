const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class AllRoles extends patron.Command {
    constructor() {
        super({
            names: ['allroles', 'listallroles'],
            groupName: 'allpeoplehere',
            description: 'Lists all assignable roles'
        });
    }

    async run(msg) {
        const allRoles = await msg.guild.roles.cache;
        let message = '**Assignable roles:**\n\n';
        const roles = [];

        allRoles.forEach(role => {
            if (Constants.protectedRoleIds[role.id] === undefined) {
                roles[role.position] = role.name;
            }
        });

        roles.reverse().forEach(role => {
            message += `${role}\n`;
        });

        return msg.sender.reply(message, { color: Constants.standardColors.green });
    }
}

module.exports = new AllRoles();
