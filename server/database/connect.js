const mongoose = require("mongoose");

const connectDb = async() => {
    try {
        
        await mongoose.connect("mongodb+srv://Najwa:1234@cluster0.km08zgo.mongodb.net/Human_Resource_Management_System")
        console.log("connected")
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDb;