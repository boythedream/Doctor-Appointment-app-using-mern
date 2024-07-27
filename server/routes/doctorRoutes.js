const express = require("express")
const authMiddleware = require("../middleware/authMiddleware");
const { getInfoDocController, updateProfileController, getAllDoctorsController, getSingleDoctorsController, doctorAppointmentsController, updateStatusController } = require("../controllers/doctorController");
const router = express.Router()
//routes

// Post single doctor info
router.post("/get-single-doc-info", authMiddleware, getInfoDocController)

// Post single doctor info
router.post("/update-profile", authMiddleware, updateProfileController)


// get all doctos
router.get('/get-all-doctors', authMiddleware, getAllDoctorsController)

// get single doctors
router.post('/get-single-doctor', authMiddleware, getSingleDoctorsController)
// doctor appointments
router.get("/doctor-appointments", authMiddleware, doctorAppointmentsController)

//Post Update Status
router.post('/update-status', authMiddleware, updateStatusController)
module.exports = router;