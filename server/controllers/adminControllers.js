const doctorModel = require("../model/doctorModel");
const userModel = require("../model/userModel");

const getAllUserController = async (req, res) => {
    try {
        const usersList = await userModel.find({});
        res.status(200).send({
            message: "Get all user list successfully",
            success: true,
            data: usersList,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong while fetching all users",
            success: false,
            error,
        });
    }
};

const getAllDoctors = async (req, res) => {
    try {
        const doctorsList = await doctorModel.find({});
        res.status(200).send({
            message: "Get all doctors list successfully",
            success: true,
            data: doctorsList,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong while fetching all doctors",
            success: false,
            error,
        });
    }
};

const changeAccountStatusController = async (req, res) => {
    try {
        const { doctorId, status } = req.body;
        const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status }, { new: true });
        if (!doctor) {
            return res.status(404).send({
                message: "Doctor not found",
                success: false,
            });
        }
        const user = await userModel.findById(doctor.userId);
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }
        const notification = user.notification || [];
        notification.push({
            type: "Doctor-account-request-updated",
            message: `Your account request has been ${status}`,
            onClickPath: "/get-all-notification",
        });
        user.isDoctor = status === "approved";
        await user.save();
        res.status(200).send({
            message: "Doctor account status updated successfully",
            success: true,
            data: doctor,
        });
    } catch (error) {
        res.status(500).send({
            message: "Something went wrong while changing account status",
            success: false,
            error,
        });
    }
};

module.exports = { getAllUserController, getAllDoctors, changeAccountStatusController };
