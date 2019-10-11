const patron = require('patron.js');
const Constants = require('../../utility/Constants');

class Help extends patron.Command {
    constructor() {
        super({
            names: ['help', 'cmd', 'commands'],
            groupName: 'allpeoplehere',
            description: 'Lists all publicly available commands',
            args: [
                new patron.Argument({
                    name: 'command',
                    key: 'command',
                    type: 'string',
                    defaultValue: '',
                    example: 'roles',
                    remainder: true
                })
            ]
        });
    }

    async run(msg, args) {
        if (args.command === '') {
            const commands = msg.client.registry.commands.filter(c => c.group.name === 'allpeoplehere');

            let message = '**Available user commands:**\n\n';

            commands.forEach(command => {
                message += `**${Constants.prefix}${command.names[0]}:** ${command.description}\n`
            });

            message += '\nYou can get more specific command info by running $help <command>';

            return msg.sender.reply(message, { color: Constants.standardColors.green });
        } else {
            args.command = args.command.startsWith(Constants.prefix) ? args.command.slice(Constants.prefix.length) : args.command;
            const lowerCommand = args.command.toLowerCase();

            const command = msg.client.registry.commands.find(c => c.names.some(com => com === lowerCommand));

            if (command === undefined) {
                msg.sender.reply(`Command ${lowerCommand} doesn't exist`, { color: Constants.standardColors.red });
            }

            let message = `**Description**: ${command.description}\n`;
            message += `**Usage**: ${Constants.prefix}${command.getUsage()}\n`;
            message += `**Example**: ${Constants.prefix}${command.getExample()}\n`;

            if (command.names.length > 1) {
                const alternate = command.names.join(', ');
                message += `**Alternate usages**: ${alternate}`;
            }

            return msg.sender.reply(message, {
                color: Constants.standardColors.green,
                title: command.names[0]
            });
        }
    }
}

module.exports = new Help();
