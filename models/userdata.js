const mongoose = require('mongoose');

// Define schemas as simple objects without complex validation
const ActivitySchema = new mongoose.Schema({
  city: String,
  activity: String,
  date: String,
  time_required: String
}); // Disable _id for subdocuments to avoid issues

const HotelSchema = new mongoose.Schema({
  city: String,
  check_in: String,
  check_out: String,
  nights: String,
  hotel_name: String
});

const FlightSchema = new mongoose.Schema({
  flightNumber: String,
  airline: String,
  departureTime: String,
  price: String
});

const DaySchema = new mongoose.Schema({
  date: String,
  place: String,
  city: String,
  morning: String,
  afternoon: String,
  evening: String,
  hotels: [HotelSchema],
  flights: [FlightSchema],
  activities: [ActivitySchema]
});

// Embedded subdocuments without separate schemas
const ItinerarySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: String,
  departure: String,
  departurefrom: String,
  arrival: String,
  destination: String,
  nooftravellers: String,

  // Inline subdocuments instead of separate schemas
  visadetail: {
    visatype: String,
    validate: String,
    processingdate: String
  },

  payment: {
    totalamount: String,
    tcs: String
  },

  itinerary: [DaySchema],

  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  // Schema options to be more lenient
  strict: false, // Allow additional fields
  validateBeforeSave: true
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);