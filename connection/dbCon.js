// Import MongoClient from MongoDB
const { MongoClient } = require("mongodb");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

const client = new MongoClient(DB_URL);

// Establish connection to the MongoDB server
async function connection() {
  try {
    // Connect to MongoDB server with CocoTracker
    await client.connect();
    return client.db("CocoTracker");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}
async function getStores() {
  try {
    // Establish connection to MongoDB
    const db = await connection();
    // Fetch data from 'Stores' collection
    const results = await db.collection("Stores").find({}).toArray();
    return results;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
}

module.exports = { getStores };
