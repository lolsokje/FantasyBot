const patron = require('patron.js');
const Constants = require('../../utility/Constants');
const { MessageEmbed } = require('discord.js');

class UnMbs extends patron.Command {
    constructor() {
        super({
            names: ['unmbs'],
            groupName: 'administration',
            description: "Removes the FIA President's Medal from a specific Lair member",
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'user',
                    example: '@FrankyDoodle#1414'
                })
            ]
        });
    }

    async run(msg, args) {
        const member = msg.guild.members.cache.find(m => m.id === args.user.id);
        const medalRole = msg.guild.roles.cache.find(r => r.id === Constants.presidentMedalRole);

        const hasRole = await member.roles.cache.find(r => r.id === Constants.presidentMedalRole);

        if (hasRole) {
            await member.roles.remove(medalRole);

            const message = `User ${member.displayName} has had their FIA President's Medal removed after having shown to be a disgrace to the Lair community.\n\nSincerely,\nMohammed Ben Sulayem\nPresident\nFédération Internationale de l'Automobile.`

            const embed = new MessageEmbed()
                .setAuthor("FIA President's Medal")
                .setImage('https://cdn.discordapp.com/attachments/1325223674365874248/1389192811332505620/ben-sulayem-tells-f1-drivers-how-he-runs-fia-is-none-of-v0-hFHnoq3zxUVyZnJY6ZmpK1fwf1lylbGwWclCHFpPxjY.jpg?ex=686cf4a0&is=686ba320&hm=dbdada33d13ab75dda5983a5ea20495cfd360397802305d5a5817a6dd4f74156&')
                .setDescription(message)
                .setColor(Constants.standardColors.red);

            return msg.channel.send(embed);
        }
    }
}

module.exports = new UnMbs();
