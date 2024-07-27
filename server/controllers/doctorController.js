
const appointmentModel = require("../model/appointmentModel")
const doctorModel = require("../model/doctorModel")
const userModel = require("../model/userModel")
//get doctor details controller
const getInfoDocController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "Doctor details fetch successfully",
            data: doctor,
        })
    } catch (error) {
        res.status(500).send({
            message: "Error while gettng doctor details",
            error
        })
    }
}
const updateProfileController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
        res.status(200).send({
            success: true,
            message: "Doctor Profile updated successfully",
            data: doctor,
        })
    } catch (error) {
        res.status(500).send({
            message: "Error while update  Profile",
            error
        })
    }
}

const getAllDoctorsController = async (req, res) => {
    try {
        const doctors = await doctorModel.find({ status: "approved" })
        res.status(200).send({
            success: true,
            message: 'All doctors fectched successfully',
            data: doctors,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while login user",
            success: false,
        })
    }
}



// getSingle doctors 

const getSingleDoctorsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findById({ _id: req.body.doctorId })
        res.status(200).send({
            success: true,
            message: "Single doctor fetched successfully",
            data: doctor
        })
    } catch (error) {
        res.status(500).send({
            message: "Error while login user",
            success: false,
        })
    }
}

// get doctor appointments
const doctorAppointmentsController = async (req, res) => {
    try {
        const doctor = await doctorModel.findOne({ userId: req.body.userId })
        const appointment = await appointmentModel.find({ doctorId: doctor._id })
        res.status(200).send({
            success: true,
            message: "Doctor Appointments fetched successfully",
            data: appointment
        })
    } catch (error) {
        res.status(500).send({
            message: "Error while Doctor appointments feteched",
            success: false,
        })
    }
}


//update Doctor Status controller
const updateStatusController = async (req, res) => {
    try {

        const { appointmentId, status } = req.body
        const appointment = await appointmentModel.findByIdAndUpdate(appointmentId, { status })
        const user = await userModel.findOne({ _id: appointment.userId });
        const notification = user.notification
        notification.push({
            type: "Status-updated",
            message: `Your Appointment has been updated ${status}`,
            onClickPath: "/doctor-appointments"
        });
        await user.save();

        res.status(200).send({
            success: true,
            message: "Doctor Status Changed successfully",
        })
    } catch (error) {
        res.status(500).send({
            message: "Error while Doctor Status change",
            success: false,
            error
        })
    }
}
module.exports = { getInfoDocController, updateProfileController, getAllDoctorsController, getSingleDoctorsController, doctorAppointmentsController, updateStatusController }