// import store from the models folder
const Store = require("../model/stores");

// method to get all stores
exports.getStores = async (req, res) => {
  try {
    // Query to find all stores
    const stores = await Store.find();
    // send a response of stores
    res.send(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to add a new store
exports.addStore = async (req, res) => {
  try {
    // Create a new Store with data from the request body
    const newStore = new Store(req.body);
    // save the daya in a result
    const result = await newStore.save();
    // send result with response
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to delete a store
exports.deleteStore = async (req, res) => {
  try {
    // get the store ID from the request parameters
    const storeId = req.params.id;
    // Find and delete the store with the specified ID from the database
    const result = await Store.findByIdAndDelete(storeId);
    // If the store was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "Store not found" });
    }
    // Send a success message as a response
    res.send({ message: "Store deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to update a store
exports.updateStore = async (req, res) => {
  try {
    // get the store ID and data from the request parameters
    const storeId = req.params.id;
    const updatedData = req.body;
    // Find and update the store with the specified ID in the database

    const result = await Store.findByIdAndUpdate(
      storeId,
      updatedData,
      // Return the updated document and run validators
      { new: true, runValidators: true }
    );
    // If the store was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "Store not found" });
    }
    // Send a success message as a response
    res.send({ message: "Store updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
