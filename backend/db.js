const mongoose = require('mongoose');
const mongoURI = "paste your mongodb database URL here";

async function mongoDB() {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const collection = mongoose.connection.collection("food_items");
        const data = await collection.find({}).toArray();

        const foodCategory = mongoose.connection.collection("foodCategory");
        const catData = await foodCategory.find({}).toArray();

        global.food_items = data;
        global.foodCategory = catData;


    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}

module.exports = mongoDB;
