const Twit = require("twit");
const config = require("config");
const new_Twit = new Twit(config.twitterApp);

module.exports = new_Twit;