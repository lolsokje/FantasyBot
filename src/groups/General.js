const patron = require('patron.js');

class General extends patron.Group {
    constructor() {
        super({
            name: 'allpeoplehere'
        });
    }
}

module.exports = new General();
