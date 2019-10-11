const Embed = require('./Embed');

class Sender {
    constructor(msg) {
        this.msg = msg;
    }

    dm(user, description, options) {
        return this.constructor.send(user, description, options);
    }

    reply(description, options) {
        return this.constructor.reply(this.msg, description, options);
    }

    send(description, options) {
        return this.constructor.send(this.msg.channel, description, options);
    }

    static reply(msg, description, options) {
        return this.send(msg.channel, description, options);
    }

    static send(channel, description, options = {}) {
        const descriptionType = typeof description;

        if (descriptionType === 'object') {
            options = description;
        } else if (descriptionType === 'string') {
            options.description = description;
        } else {
            throw new Error('The description must be an object or a string.');
        }

        return channel.send({ embed: new Embed(options) });
    }
}

module.exports = Sender;
