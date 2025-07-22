const express = require('express');
const router = express.Router();
const Itinerary = require('../models/userdata');

exports.postdata = async (req, res) => {
    try {
        const { name, email, departure, departurefrom, arrival, destination, nooftravellers, visadetail, payment, itinerary } = req.body;

        const DataDoc = new Itinerary({
            name: name || 'Traveller',
            email: email || '',
            departure: departure || '',
            departurefrom: departurefrom || '',
            arrival: arrival || '',
            destination: destination || '',
            nooftravellers: nooftravellers || '',
            visadetail: visadetail && typeof visadetail === 'object' ? {
                visatype: visadetail.visatype || '',
                validate: visadetail.validate || '',
                processingdate: visadetail.processingdate || ''
            } : {},
            payment: payment && typeof payment === 'object' ? {
                totalamount: payment.totalamount || '',
                tcs: payment.tcs || ''
            } : {},
            itinerary: Array.isArray(itinerary) ? itinerary.map(day => ({
                date: String(day.date || ''),
                place: String(day.place || ''),
                city: String(day.city || ''),
                morning: String(day.morning || ''),
                afternoon: String(day.afternoon || ''),
                evening: String(day.evening || ''),
                hotels: Array.isArray(day.hotels) ? day.hotels.map(hotel => ({
                    city: String(hotel.city || ''),
                    check_in: String(hotel.check_in || ''),
                    check_out: String(hotel.check_out || ''),
                    nights: String(hotel.nights || ''),
                    hotel_name: String(hotel.hotel_name || ''),
                    price: String(hotel.price || ''),
                    people: String(hotel.people || '')
                })) : [],
                flights: Array.isArray(day.flights) ? day.flights.map(flight => ({
                    flightNumber: String(flight.flightNumber || ''),
                    airline: String(flight.airline || ''),
                    departureTime: String(flight.departureTime || ''),
                    price: String(flight.price || '')
                })) : [],
                activities: Array.isArray(day.activities) ? day.activities.map(activity => ({
                    city: String(activity.city || ''),
                    activity: String(activity.activity || ''),
                    date: String(activity.date || ''),
                    time_required: String(activity.time_required || '')
                })) : []
            })) : []
        });

        await DataDoc.save();

        res.status(201).json({
            message: 'Itinerary saved successfully.',
            id: DataDoc._id
        });

    } catch (error) {
        console.error('Error saving itinerary:', error);

        res.status(500).json({
            error: 'Failed to save itinerary',
            details: error.message
        });
    }
};



// exports.getItineraryByEmail = async (req, res) => {

exports.getdata = async (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email query parameter is required.' });
    }

    try {
        const latestItinerary = await Itinerary.findOne({ email })
            .sort({ createdAt: -1 });
        if (!latestItinerary) {
            return res.status(404).json({ message: 'No itinerary found for this email.' });
        }

        res.status(200).json(latestItinerary);
    } catch (error) {
        console.error('Error fetching itinerary:', error);
        res.status(500).json({ error: 'Server error.', details: error.message });
    }
};
