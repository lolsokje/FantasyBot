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
        const user = msg.mentions.users.first();
        const welcomeRole = msg.guild.roles.cache.find(r => r.id === '631384841828696075');
        const allpeoplehereRole = msg.guild.roles.cache.find(r => r.id === '480800248281956375');
        const generalChannel = msg.guild.channels.cache.find(c => c.id === '630445959612071990');

        const member = msg.guild.members.cache.find(m => m.id === user.id);

        await member.roles.remove(welcomeRole);
        await member.roles.add(allpeoplehereRole);

        const message = await msg.sender.reply(`${member.displayName} verified`, { color: Constants.standardColors.green });
        await msg.delete({timeout: 3000});
        await message.delete();

        return generalChannel.send(`**Welcome ${member.displayName}!**`);
    }
}

module.exports = new Verify();

