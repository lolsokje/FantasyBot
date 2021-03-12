class Constants {
    constructor() {
        this.standardColors = {
			red: 0xC80000,
			green: 0x009600,
			blue: 0x000096
        };
        this.prefix = '$';
        this.prefixRegex = /^[$]/;

        this.permanentRoleIds = {
            '480800248281956375': 'allpeoplehere',
            '631154732055920660': 'carl-bot',
            '631213309970087939': 'boosty boi',
            '631219272818884628': 'Muted',
            '631201839341109317': 'AAAAAAAAH IT\'S A ROBOT',
            '540600337505976321': 'ACGPI',
            '466720104265285643': 'OG Members',
            '515616949594619935': 'NotSoBot',
            '630725960362360845': 'MEE6',
            '631384841828696075': 'Welcome',
            '631216913267032067': 'FantasyBot',
            '466346997667069964': '@everyone',
            '466710569639084032': 'Franki Lauda',
        };

        this.protectedRoleIds = {
            '480800248281956375': 'allpeoplehere',
            '631154732055920660': 'carl-bot',
            '631213309970087939': 'boosty boi',
            '631219272818884628': 'Muted',
            '631201839341109317': 'AAAAAAAAH IT\'S A ROBOT',
            '540600337505976321': 'ACGPI',
            '466720104265285643': 'OG Members',
            '515616949594619935': 'NotSoBot',
            '630725960362360845': 'MEE6',
            '631384841828696075': 'Welcome',
            '631216913267032067': 'FantasyBot',
            '466346997667069964': '@everyone',
            '466710569639084032': 'Franki Lauda',
            '482175767908712468': 'Admins'
        };

        this.allowedChannelIds = {
            '515617239521558548': 'robots-and-shitposts',
            '631221631301320708': 'admin-bot-playground',
            '630735325303537665': 'welcome',
            '630445959612071990': 'general-discussion'
        };

        this.whitelistedCommands = [
            'say'
        ];
    }
}

module.exports = new Constants();
