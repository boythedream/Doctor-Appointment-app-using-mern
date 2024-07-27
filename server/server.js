const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDb = require('./config/db')
const cors = require('cors')
dotenv.config()
//rest objects 
const app = express()
const authRoutes = require('./routes/userRoute')
const adminRoutes = require('./routes/adminRoute')
const doctorRoutes = require('./routes/doctorRoutes')
const path = require('path')

//middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
const PORT = process.env.PORT || 8080

//database connection
connectDb();
//routes
app.use('/api/v1/user', authRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/doctors', doctorRoutes)

// static files
app.use(express.static(path.join(__dirname, '../client/dist')))

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.DEV_MODE} on port ${PORT}`)
})