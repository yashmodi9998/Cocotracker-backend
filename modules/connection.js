const { MongoClient } = require("mongodb");
require("dotenv").config();
//get DB_URL from env file
const DB_URL = process.env.DB_URL;
// store DB_URL in MongoClient
const client = new MongoClient(DB_URL);
// Method to establish connection with database
async function connection() {
  try {
    await client.connect();
    return client.db("CocoTracker");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

module.exports = connection;
