const express = require("express");
const router = express.Router();
const Flight = require("../../models/Flights");
const config = require('config');

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

module.exports = router;