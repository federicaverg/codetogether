const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
    title: {type: String, required: true},
    // author: {type. String, required: true}
    date: {type: Date, required: true},
    //lastAccess: {type: Date, required: true},
    description: {type: String, required: true},
    code: {type: String, required: true},
    versions: [{type: String}],
    parts: {type: Number, required: true} ,
    //intervals: [{type: Number, required: true}]
}, { timestamps: true});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;


