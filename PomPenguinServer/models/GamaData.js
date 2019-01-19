let mongoose = require('mongoose');

let gameDataShema = mongoose.Schema({
    "level":{
        "type":Number,
        "required": true
    },
    "ice":{
        "type":Number,
        "required": true
    },
    "snow":{
        "type":Number,
        "required": true
    },
    "water":{
        "type":Number,
        "required": true
    },
    "color":{
        "type":String,
        "required": true
    },
    "token":{
        "type":String,
        "required": true
    },

});

let gameData = module.exports = mongoose.model('gameData', gameDataShema);