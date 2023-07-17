const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: {type: String, require: true, unique: true},
    serverId: {type: String, require: true},
    coins: {type: Number, default: 100},
    packsopened: {type: Number, default: 0},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 0},
    xpgoal: {type: Number, default: 50}
});

const model = mongoose.model("fluxxdb", profileSchema);

module.exports = model;