class Constants {
    constructor() {
        this.errorCodes = {
            badRequest: 400,
            discord: (code) => code >= 500 && code < 600
        }

        this.prefix = '$';
        this.prefixRegex = /^$/;
    }
}

module.exports = new Constants();
