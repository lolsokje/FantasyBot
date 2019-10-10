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
        const allRoles = await msg.guild.roles;
        let message = '**Assignable roles:**\n\n';

        allRoles.forEach(role => {
            if (!Constants.protectedRoles.includes(role.name)) {
                message += `${role.name}\n`;
            }
        });

        return msg.sender.reply(message, { color: Constants.standardColors.green });
    }
}

module.exports = new AllRoles();
