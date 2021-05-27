const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const versionSchema = new Schema({
    title: {type: String, required: true},
    //author: {type: String, required: true},
    //part: {type: Number, required: true},
    date: {type: Date, required: true},
    //lastAccess: {type: Date, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    exercise: {type: String, required: true}
}, {timestamps: true});

const Version = mongoose.model('Version', versionSchema);

module.exports = Version;