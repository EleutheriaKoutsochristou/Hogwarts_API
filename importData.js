const mongoose = require("mongoose");
const MagicItem = require("./models/MagicItem");
require("dotenv").config();

const data = require("./data.json");

async function importData() {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
        await MagicItem.deleteMany();
        console.log("Old data deleted");
        await MagicItem.insertMany(data);
        console.log("Data inserted!");
        process.exit();
    } catch (error) {
        console.log("ERROR:", error);
        process.exit(1);
    }
}

importData();