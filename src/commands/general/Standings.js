const patron = require('patron.js');
const Constants = require('../../utility/Constants');
const fetch = require('node-fetch');

class Standings extends patron.Command {
    constructor() {
        super({
            names: ['standings'],
            groupName: 'allpeoplehere',
            description: 'Returns the driver and/or constructor standings for a given season',
            args: [
                new patron.Argument({
                    name: 'year',
                    key: 'year',
                    type: 'string',
                    example: '2019'
                }),
                new patron.Argument({
                    name: 'type',
                    key: 'type',
                    type: 'string',
                    example: 'drivers',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        const type = args.type.toLowerCase();
        const year = parseInt(args.year);
        const teamTypes = ['teams', 'team', 'constructor', 'constructors', 'wcc'];
        const driverTypes = ['drivers', 'driver', 'wdc'];
        const allTypes = ['all', 'both'];

        if (year < 1950 || year > 2020) {
            return msg.sender.reply('Year must be between 1950 and 2020', { color: Constants.standardColors.red });
        } else if (year < 1958 && (teamTypes.includes(type) || allTypes.includes(type))) {
            return msg.sender.reply('There was no constructors\' title before 1958, you donkey', { color: Constants.standardColors.red });
        } else if (!teamTypes.includes(type) && !driverTypes.includes(type) && !allTypes.includes(type)) {
            let allowedTypeMessage = `Type ${type} is not allowed, the following types are allowed:\n\n`

            allowedTypeMessage += '**Teams:**\n';
            teamTypes.forEach((type) => {
                allowedTypeMessage += `${type}\n`;
            });

            allowedTypeMessage += '\n**Drivers:**\n';
            driverTypes.forEach((type) => {
                allowedTypeMessage += `${type}\n`;
            });

            allowedTypeMessage += '\n**All:**\n';
            allTypes.forEach((type) => {
                allowedTypeMessage += `${type}\n`;
            });
            return msg.sender.reply(allowedTypeMessage, { color: Constants.standardColors.red });
        } else if (driverTypes.includes(type)) {
            let message = await this.fetchStandings(year, 'driver');
            message += '\nThanks to the Ergast API';
            return msg.sender.reply(message, { color: Constants.standardColors.green });
        } else if (teamTypes.includes(type)) {
            let message = await this.fetchStandings(year, 'constructor');
            message += '\nThanks to the Ergast API';
            return msg.sender.reply(message, { color: Constants.standardColors.green });
        } else if (allTypes.includes(type)) {
            const driverMessage = await this.fetchStandings(year, 'driver');
            const teamMessage = await this.fetchStandings(year, 'constructor');

            let message = `${driverMessage}\n${teamMessage}`;
            message += '\nThanks to the Ergast API';

            return msg.sender.reply(message, { color: Constants.standardColors.green });
        }
    }

    async fetchStandings(year, type) {
        const response = await fetch(`https://ergast.com/api/f1/${year}/${type}Standings.json`);
        const json = await response.json();
        const list = json.MRData.StandingsTable.StandingsLists[0];
        const standings = type === 'driver' ? list.DriverStandings : list.ConstructorStandings;
        const standingsArray = [];

        standings.forEach(standing => {
            standingsArray.push({
                position: standing.position,
                name: type === 'driver' ? `${standing.Driver.givenName} ${standing.Driver.familyName}` : standing.Constructor.name,
                points: standing.points
            });
        });

        let message = `**${year} ${type} standings**:\n\n`;
        message += `**POSITION** | **${type.toUpperCase()}** | **POINTS**\n`

        standingsArray.forEach(standing => {
            message += `${standing.position}  |  ${standing.name}  |  ${standing.points}\n`
        });

        return message;
    }
}

module.exports = new Standings();
