const express = require('express')
const authMiddleware = require('../middleware/authMiddleware')
const { getAllDoctors, getAllUserController, changeAccountStatusController } = require('../controllers/adminControllers')

const router = express.Router()

//Get Method users
router.get("/get-all-user", authMiddleware, getAllUserController)

//Get Method Doctors
router.get("/get-all-doctor", authMiddleware, getAllDoctors)

//change post account status 
router.post("/change-account-status", authMiddleware, changeAccountStatusController)

module.exports = router