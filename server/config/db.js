const mongoose = require('mongoose')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb Connected successfully `.bgGreen);
    } catch (error) {
        console.log(`MongoDb Connected faild ${error}`);

    }
}

module.exports = connectDb;