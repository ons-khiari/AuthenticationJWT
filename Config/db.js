const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        await mongoose.connect(process.env.DATA_BASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to the MongoDB database");
    } catch (error) {
        console.log("Error connecting to the database:", error);
    }
};

module.exports = connectdb;