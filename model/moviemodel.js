const mongoose = require('mongoose');

const Movies = new mongoose.Schema({

    name:{type:String},
    image:{type:String},
    category:{type:String},
    language:{type:String},
    release_date:{type:String},
    summary:{type:String},
    cast_name:{type:String},
    crew_name:{tyrp:String},

    
});

const movies = mongoose.model('Movie', Movies);

module.exports = movies;