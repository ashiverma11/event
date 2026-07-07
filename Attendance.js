const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    checkInTime: {
        type: Date
    },

    checkOutTime: {
        type: Date
    },

    status: {
        type: String,
        enum: ["IN", "OUT"],
        default: "IN"
    }

});

module.exports = mongoose.model(
    "Attendance",
    attendanceSchema
);
