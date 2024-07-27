const express = require('express');
const { registerController, loginController, authController, applyDoctorController, getNotificationController, deleteNotificationController, bookAappointmentController, bookingAvailabilityController, appointmentController } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

//Register
router.post('/register', registerController)
//user login
router.post('/login', loginController)
// auth || Login
router.post('/getUserData', authMiddleware, authController)

// apply-Doctor || Login
router.post('/apply-doctor', authMiddleware, applyDoctorController)

// get-all-notification || Login
router.post('/get-all-notification', authMiddleware, getNotificationController)
// delete-all-notification || Login
router.post('/delete-all-notification', authMiddleware, deleteNotificationController)


//book-appointment
router.post("/book-appointment", authMiddleware, bookAappointmentController)
//check -Availability
router.post("/booking-availability", authMiddleware, bookingAvailabilityController)

// Appointments List
router.get("/appointment", authMiddleware, appointmentController)
module.exports = router;