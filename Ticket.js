const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    eventName: {
        type: String,
        required: true
    },

    ticketId: {
        type: String,
        required: true
    },

    qrCode: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Ticket", ticketSchema);