class Constants {
    constructor() {
        this.standardColors = {
            red: 0xFF0000,
            green: 0x00FF00,
            blue: 0x0000FF
        };
        this.prefix = '$';
        this.prefixRegex = /^[$]/;

        this.permanentRoles = [
            'allpeoplehere',
            'carl-bot',
            'boosty boi',
            'Muted',
            'AAAAAAAAH IT\'S A ROBOT',
            'AICGP',
            'OG Members',
            'NotSoBot',
            'MEE6',
            'Welcome',
            'FantasyBot',
            '@everyone',
            'Franki Lauda',
            'OG²-members'
        ];
        this.protectedRoles = [
            'Muted',
            'allpeoplehere',
            'AICGP',
            'Welcome',
            'OG Members',
            'AAAAAAAAH IT\'S A ROBOT',
            'NotSoBot',
            'MEE6',
            'FantasyBot',
            '@everyone',
            'Franki Lauda',
            'boosty boi',
            'carl-bot',
            'Admins',
            'OG²-members'
        ];
        this.allowedChannels = [
            'robots-go-here',
            'admin-bot-playground',
            'welcome'
        ];
        this.whitelistedCommands = [
            'say'
        ];
    }
}

module.exports = new Constants();
