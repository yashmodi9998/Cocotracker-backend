// import stock from the modules folder
const Stock = require("../model/stocks");

// method to get all stocks
exports.getStock = async (req, res) => {
  try {
    // Query to find all stocks
    const stocks = await Stock.find();
    // send a response of stocks
    res.send(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to add a new stock
exports.addStock = async (req, res) => {
  try {
    // Create a new stock with data from the request body
    const newStock = new Stock(req.body);
    // save the daya in a result
    const result = await newStock.save();
    // send result with response
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to delete a stock
exports.deleteStock = async (req, res) => {
  try {
    // get the stock ID from the request parameters
    const stockId = req.params.id;
    // Find and delete the stock with the specified ID from the database
    const result = await Stock.findByIdAndDelete(stockId);
    // If the stock was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "stock not found" });
    }
    // Send a success message as a response
    res.send({ message: "stock deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to update a stock
exports.updateStock = async (req, res) => {
  try {
    // get the stock ID and data from the request parameters
    const stockId = req.params.id;
    const updatedData = req.body;
    // Find and update the stock with the specified ID in the database

    const result = await Stock.findByIdAndUpdate(
      stockId,
      updatedData,
      // Return the updated document and run validators
      { new: true, runValidators: true }
    );
    // If the stock was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "stock not found" });
    }
    // Send a success message as a response
    res.send({ message: "stock updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
