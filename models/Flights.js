const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FlightsSchema = new Schema({
  ticket_type: {
    type: String,
    default: 'One Way',
  },
  airline: {
    type: String,
    
  },
  from: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  to: {
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  price: {
    type: Number,
  },
  departure_date: {
    type: Date,
  },
  arrival_date: {
    type: Date,
  },
});

module.exports = Flights = mongoose.model("flights", FlightsSchema);
