const userModel = require("../model/userModel");
const doctorModel = require("../model/doctorModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const moment = require('moment')
const appointmentModel = require("../model/appointmentModel");
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // if (!name || !email || !password) {
        //     return res.status(400).send({
        //         success: false,
        //         message: "Plz fill all filed"
        //     })
        // }
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(404).send({
                message: "User already existed",
                success: false
            })
        }
        // Generate JWT token

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new userModel({ name, email, password: hashedPassword })
        await user.save()
        res.status(200).send({
            message: "new user registerd successfully",
            success: true,
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while register a user",
            success: false
        })
    }
}



const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' } // Token expires in 1 day
        );

        // If login is successful, return success response with token
        return res.status(201).send({
            success: true,
            message: "User login successfully",
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error while logging in user",
            success: false,
            error
        });
    }
};


const authController = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }
        res.status(200).send({
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Some error occurred during authentication",
            success: false,
            error
        });
    }
};

// apply doctor controler

const applyDoctorController = async (req, res) => {
    try {
        const newDoctor = await doctorModel({ ...req.body, status: "pending" })
        await newDoctor.save()
        const adminUser = await userModel.findOne({ isAdmin: true })
        const notification = adminUser.notification
        notification.push({
            type: 'apply-dcotor-request',
            message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for a Doctor Account`,
            data: {
                doctorId: newDoctor._id,
                name: newDoctor.firstName + "" + newDoctor.lastName,
                onClickPath: '/admin/doctors'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(200).send({
            success: true,
            message: "Doctor Account Applied Successfully"

        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "error while applying doctor"
        })
    }
}

const getNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        const seennotification = user.seennotification;
        const notification = user.notification
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = []
        user.seennotification = notification
        const updatedUser = await user.save()
        res.status(200).send({
            success: true,
            message: "All notification marked as read",
            data: updatedUser,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Error in notification",
            success: false,
            error,
        })
    }
}

const deleteNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId })
        user.notification = []
        user.seennotification = []
        const updatedUser = await user.save()
        updatedUser.password = undefined
        res.status(200).send({
            success: true,
            message: " delete all notification successfully",
            data: updatedUser
        })
    } catch (error) {
        res.status(200).send({
            success: false,
            message: "Unable to delete all notification",
            error
        })
    }
}


const bookAappointmentController = async (req, res) => {
    try {
        req.body.date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        req.body.time = req.body.time.map(t => moment(t, 'HH:mm').toISOString());
        req.body.status = "pending";

        if (Array.isArray(req.body.time)) {
            req.body.time = req.body.time.join(' - ');
        }

        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();

        const user = await userModel.findOne({ _id: req.body.userId });

        const doctorInfo = JSON.parse(req.body.doctorInfo); // Parse the JSON string
        const userInfo = JSON.parse(req.body.userInfo); // Parse the JSON string

        user.notification.push({
            type: "new-appointment-request",
            message: `A new appointment request from ${userInfo.name} for Dr. ${doctorInfo.firstName} ${doctorInfo.lastName}`,
            onClickPath: "/appointments"
        });
        await user.save();

        res.status(200).send({
            success: true,
            message: "New Book Appointment successfully approved",
            data: newAppointment,
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while booking appointment",
            error
        });
    }
}




const bookingAvailabilityController = async (req, res) => {
    try {
        const date = moment(req.body.date, 'DD-MM-YYYY').toISOString();
        const fromTime = moment(req.body.time[0], 'HH:mm').toISOString();
        const toTime = moment(req.body.time[1], 'HH:mm').toISOString();
        const doctorId = req.body.doctorId;

        const appointment = await appointmentModel.find({
            doctorId,
            date,
            time: {
                $gte: fromTime,
                $lte: toTime
            }
        });

        if (appointment.length > 0) {
            res.status(200).send({
                success: false,
                message: "Appointment not available at this time"
            });
        } else {
            res.status(200).send({
                success: true,
                message: "Appointment available"
            });
        }
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while checking availability",
            error
        });
    }
};

// appointment lis controller

const appointmentController = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({ userId: req.body.userId })
        res.status(200).send({
            success: true,
            message: "User appointments fetched successfully",
            data: appointments,
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error while Getting availability user list",
            error
        });
    }
}

module.exports = { registerController, loginController, authController, applyDoctorController, getNotificationController, deleteNotificationController, bookAappointmentController, bookingAvailabilityController, appointmentController }