const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flights");
const config = require('config');
const Flights = require("../../models/Flights");

// @route    POST api/flights
// @desc     Register flights
// @access   Public
router.post(
    "/",
    async (req, res) => {
        
        const { ticket_type, airline, from, to, price, departure_date, arrival_date } = req.body;
        try {
            flight = new Flight({
                ticket_type, airline, from, to, price, departure_date, arrival_date
            });
            await flight.save();
            
            res.json(flight);

        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    }
);

router.get('/', async (req, res) => {
    try {
        const flights = await Flights.find();
        res.json(flights);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


router.put('/', async (req, res) => {
    try {
        const flight = await Flights.findByIdAndUpdate(
            { _id: req.query.flight_id },
            { post_id: req.query.post_id },
        );
         res.json(flight);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;