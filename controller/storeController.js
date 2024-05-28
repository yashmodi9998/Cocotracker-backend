// Import the stores module which contains the database logic
const stores = require("../modules/stores");
// Method to get all stores
exports.getStores = async (req, res) => {
  try {
    // Call the getStores method from the stores module
    let storeData = await stores.getStores();
    // Send the retrieved store data as the response
    res.send(storeData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Method to add a new store
exports.addStore = async (req, res) => {
  try {
    // Read the new store data from the request body
    const newStore = req.body;
    // Call the addStore method from the stores module and store it into result
    const result = await stores.addStore(newStore);
    // Send the result as the response with a 201 status code
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Method to delete a store by ID
exports.deleteStore = async (req, res) => {
  try {
    // get the store ID from the request parameters
    const storeId = req.params.id;
    // Call the deleteStore method from the stores module
    const result = await stores.deleteStore(storeId);
    // send the response
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Method to update a store by ID
exports.updateStore = async (req, res) => {
  try {
    // Read the store ID from the request parameters
    const storeId = req.params.id;
     // Read the updated store data from the request body
    const updatedData = req.body;
     // Call the updateStore method from the stores module and store it in a variable
    const result = await stores.updateStore(storeId, updatedData);
     // If no store was matched for the update, send a 404 Not Found response
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Store not found" });
    }
     // Send a success message as the response with a 200 status code
    res.status(200).send({ message: "Store updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
