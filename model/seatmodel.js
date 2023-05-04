const mongoose = require('mongoose');

const Seat = new mongoose.Schema({

    movie_id:{type:String},
    user_id:{type:String},
    Booking_seat:{type:Array},
    total_seat:{type:Array,default: ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B11","B12","B13","B14","B15","B16","B17","B19","B20","C21","C22","C23","C24","C25"]},
    booking_date:{type:String},
    ticket_date:{type:String}
    
});

const seat = mongoose.model('SetBooking', Seat);

module.exports = seat;