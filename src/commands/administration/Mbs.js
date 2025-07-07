const patron = require('patron.js');
const Constants = require('../../utility/Constants');
const { MessageEmbed } = require('discord.js');

class Mbs extends patron.Command {
    constructor() {
        super({
            names: ['mbs'],
            groupName: 'administration',
            description: "Bestows the FIA President's Medal to a Lair member",
            args: [
                new patron.Argument({
                    name: 'user',
                    key: 'user',
                    type: 'user',
                    example: '@FrankyDoodle#1414'
                }),
                new patron.Argument({
                    name: 'duration',
                    key: 'duration',
                    type: 'string',
                    example: '1h'
                }),
                new patron.Argument({
                    name: 'reason',
                    key: 'reason',
                    type: 'string',
                    example: 'Making an actually funny joke for once',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const member = msg.guild.members.cache.find(m => m.id === args.user.id);
        const medalRole = msg.guild.roles.cache.find(r => r.id === Constants.presidentMedalRole);

        const duration = args.duration;
        const time = duration.replace(/\D/g, '');
        let millis;
        let unit;

        if (duration.includes('s')) {
            millis = time * 1000;
            unit = 'second';
        } else if (duration.includes('m')) {
            millis = time * 60000;
            unit = 'minute';
        } else if (duration.includes('h')) {
            millis = time * 3600000;
            unit = 'hour';
        } else if (duration.includes('d')) {
            millis = time * 86400000;
            unit = 'day';
        } else {
            msg.sender.reply('Please give a valid duration, possibilities; seconds (s), minutes (m), hours (h), days (d)', { color: Constants.standardColors.red });
        }

        if (time > 1) {
            unit += 's';
        }

        await member.roles.add(medalRole);

        setTimeout(() => {
            member.roles.remove(medalRole);
        }, millis);

        const message = `User ${member.displayName} has been bestowed the FIA President's Medal for their commitment to the Lair community. Their accomplishments, Reason "${args.reason}", have granted them an elevated status for the duration of ${time} ${unit}.\n\nSincerely,\nMohammed Ben Sulayem\nPresident\nFédération Internationale de l'Automobile.`

        const embed = new MessageEmbed()
            .setAuthor("FIA President's Medal")
            .setImage('https://cdn.discordapp.com/attachments/1325223674365874248/1389192811332505620/ben-sulayem-tells-f1-drivers-how-he-runs-fia-is-none-of-v0-hFHnoq3zxUVyZnJY6ZmpK1fwf1lylbGwWclCHFpPxjY.jpg?ex=686cf4a0&is=686ba320&hm=dbdada33d13ab75dda5983a5ea20495cfd360397802305d5a5817a6dd4f74156&')
            .setDescription(message)
            .setColor(Constants.standardColors.green);

        return msg.channel.send(embed);
    }
}

module.exports = new Mbs();
