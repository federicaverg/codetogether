const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const versionSchema = new Schema({
    author: {type: String, required: true},
    part: {type: Number, required: true},
    date: {type: Date, required: true},
    lastAccess: {type: Date, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true}
    // parent??
})

const exerciseSchema = new Schema({
    title: {type: String, required: true},
    // author: {type. String, required: true}
    date: {type: Date, required: true},
    lastAccess: {type: Date, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    versions: [versionSchema],
    parts: {type: Number, required: true} ,
    intervals: [{type: Number, required: true}]
}, { timestamps: true});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;


