const { ObjectId } = require("mongodb");
const connection = require("./connection");

// Function to retrieve all stores from the database
async function getStores() {
  try {
     // Establish connection to the database
    const db = await connection();
    // Find data in stores collection and convert it to array and store it in a result variable
    const results = await db.collection("Stores").find({}).toArray();
    return results;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw error;
  }
}

async function addStore(store) {
  try {
     // Establish connection to the database
    const db = await connection();
    // insert a new data to Stores collection
    const result = await db.collection("Stores").insertOne(store);
    return result;
  } catch (error) {
    console.error("Error adding store:", error);
    throw error;
  }
}

async function deleteStore(storeId) {
  try {
 // Establish connection to the database
    const db = await connection();
    // Delete document from the 'Stores' collection matching the storeId
    const result = await db.collection("Stores").deleteOne({ _id: new ObjectId(storeId) });
    return result;
  } catch (error) {
    console.error("Error deleting store:", error);
    throw error;
  }
}

async function updateStore(storeId, updatedData) {
  try {
     // Establish connection to the database
    const db = await connection();
    // Update document from the 'Stores' collection matching the storeId
   
    const result = await db.collection("Stores").updateOne({ _id: new ObjectId(storeId) }, { $set: updatedData });
    return result;
  } catch (error) {
    console.error("Error updating store:", error);
    throw error;
  }
}
// Export the functions to use in other files
module.exports = { getStores, addStore, deleteStore, updateStore };
