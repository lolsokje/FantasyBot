const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Verify extends patron.Command {
    constructor() {
        super({
            names: ['verify'],
            groupName: 'administration',
            botPermissions: ['MANAGE_ROLES'],
            preconditions: ['Administrator'],
        });
    }

    async run(msg, args) {
        const member = msg.mentions.members.first();
        const welcomeRole = msg.guild.roles.find(r => r.name === 'Welcome');
        const allpeoplehereRole = msg.guild.roles.find(r => r.name === 'allpeoplehere');

        await member.roles.remove(welcomeRole);
        await member.roles.add(allpeoplehereRole);

        const message = await msg.sender.reply(`${member.displayName} verified`, { color: Constants.standardColors.green });
        msg.delete(3000);
        message.delete(3000);
        return message;
    }
}

module.exports = new Verify();

