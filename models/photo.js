const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    uri: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false
    }

}, { timestamps: true } );

const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;