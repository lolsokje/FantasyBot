const patron = require('patron.js');

class Administration extends patron.Group {
    constructor() {
        super({
            name: 'administration',
            preconditions: ['Administrator']
        });
    }
}

module.exports = new Administration();
