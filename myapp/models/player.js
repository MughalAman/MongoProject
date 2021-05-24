const mongoose = require('mongoose');

var Trophy = mongoose.Schema({
    title: String,
    description: String
});

var PlayerSchema = mongoose.Schema({
    name: String,
    score: Number,
    trophies: [Trophy]
});

module.exports  = mongoose.model('PlayerSchema', PlayerSchema);