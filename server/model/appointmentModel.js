const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema({


    userId: {
        type: String,

    },
    doctorId: {
        type: String,
        required: [true, "Doctorid is required"]

    },
    doctorInfo: {
        type: String,
        required: [true, "doctorInfo is required"]

    },
    userInfo: {
        type: String,
        required: [true, "userInfo is required"]

    },
    date: {
        type: String,
        required: [true, "date is required"]

    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    time: {
        type: [String],
        required: [true, "time is required"]

    },



}, { timestamps: true })

const appointmentModel = mongoose.model("appointments", appointmentSchema)

module.exports = appointmentModel