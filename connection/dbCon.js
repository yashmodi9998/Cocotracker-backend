// Import MongoClient from MongoDB
const { MongoClient, ObjectId } = require("mongodb");
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
//TO get all kiosk stores
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
//To add a new store
async function addStore(store) {
  try {
    // Establish connection to MongoDB
    const db = await connection();
    // insert data into Stores collection
    const result = await db.collection("Stores").insertOne(store);
    return result;
  } catch (error) {
    console.error("Error adding store:", error);
    throw error;
  }
}
// To delete a store
async function deleteStore(storeId) {
  try {
    // Establish connection to MongoDB
    const db = await connection();
    // delete data from Stores collection
    const result = await db
      .collection("Stores")
      .deleteOne({ _id: new ObjectId(storeId) });
    return result;
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
}
//To update a existing store
async function updateStore(storeId, updatedData) {
  try {
    // Establish connection to MongoDB
    const db = await connection();
    // Update data for stores collection.
    const result = await db
      .collection("Stores")
      .updateOne({ _id: new ObjectId(storeId) }, { $set: updatedData });
    return result;
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
}
module.exports = { getStores, addStore, deleteStore, updateStore };
