var express = require('express');
var router = express.Router();
var seat = require('../model/seatmodel');


/* Booking Seat */
router.get('/Booking/:id', async function(req, res, next) {
  
    try {
        const Booking_seat = req.body.Booking_seat; 
        
        const d = new Date();
        var date = d.getUTCDate();
        var month = d.getUTCMonth()+1;
        var year = d.getUTCFullYear();

        var today_date = date+"/"+month+"/"+year;

        console.log(today_date);

        var data = await seat.find({"movie_id":req.params.id , "booking_date":today_date});

        var ticket_date = await seat.find({"movie_id":req.params.id , "ticket_date":req.body.ticket_date});
           
            if(ticket_date.length!=0 && data.length!=0)
            {
                if(data[0].Booking_seat.includes(Booking_seat))
                {
                    res.status(200).json({
                        status:"Seat Already booked",
                    })
                }
                else
                {    
                    var seat_id = data[0]._id;
                    let Bokked_seat = data[0].Booking_seat;
                    Bokked_seat.push(Booking_seat);
                    
                    await seat.findByIdAndUpdate(seat_id,{"Booking_seat":Bokked_seat});
                    var seatdetails = await seat.findById(seat_id);

                    res.status(200).json({
                        status:"Your seat is book successfully",
                        seatdetails
                    })
                }
            }
            else
            {
                var obj = {
                    movie_id:req.params.id,
                    Booking_seat:req.body.Booking_seat,
                    booking_date:today_date,
                    ticket_date:req.body.ticket_date
                }
                var seatdetails = await seat.create(obj);

                res.status(200).json({
                    status:"Your seat is book successfully",
                    seatdetails
                })
            }
    } catch (error) {
        res.status(200).json({
          status:"somthing went to wrong",
          error
        })
    }

});


/* Select Seat */
router.get('/seating/:id', async function(req, res, next) {
  
        try {
            var id = req.params.id;

                var booking_date = req.body.ticket_date;

                const d = new Date();
                var date = d.getUTCDate();
                var month = d.getUTCMonth()+1;
                var year = d.getUTCFullYear();

                var today_date = date+"/"+month+"/"+year;

                    if(booking_date==null)
                    {
                        var booking_date = today_date;

                        var data = await seat.find({"movie_id":id});
                            res.status(200).json({
                                status:"Seating Data",
                                data
                            })
                    }
                    else
                    {
                        var booking_date = req.body.ticket_date

                        var data = await seat.find({"movie_id":id , "ticket_date":booking_date});
                            res.status(200).json({
                                status:"Seating Data",
                                data
                            })
                    }
        }   catch (error) {
            res.status(200).json({
                status:"somthing went to wrong",
                error
            })
        }
});

module.exports = router;
