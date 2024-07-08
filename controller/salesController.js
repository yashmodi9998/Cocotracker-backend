const Sales = require("../model/sales");

// Method to get all sales
exports.getSales = async (req, res) => {
  try {
    // Query to find all sales data
    const sales = await Sales.find();
    // Send a success message
    res.send(sales);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to add a new sale
exports.addSale = async (req, res) => {
  try {
    // to get relevent fields from body params
    const { quantitySold, date, storeName, kioskOwner } = req.body;
    // to set values of data
    const newSale = new Sales({ quantitySold, date, storeName, kioskOwner });
    // to save value to db
    const result = await newSale.save();
    // set a res as 201 and send the resuls as a response
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to delete a sale by ID
exports.deleteSale = async (req, res) => {
  try {
    //to get the sale ID from the request parameters
    const saleId = req.params.id;
    // Find and delete the sale with the specified ID from the database
    const result = await Sales.findByIdAndDelete(saleId);
    // If the sale was not found, send a 404 response
    if (!result) {
      return res.status(404).send({ message: "Entry not found" });
    }
    // Send a success message
    res.send({ message: "Entry deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to update a sale by ID
exports.updateSale = async (req, res) => {
  try {
    //to get the sale ID from the request parameters
    const saleId = req.params.id;
    // Find and update the sale with the specified ID in the database
    const { quantitySold, date, storeId, kioskOwnerId } = req.body;
    const result = await Sales.findByIdAndUpdate(
      saleId,
      { quantitySold, date, storeId, kioskOwnerId },
      { new: true, runValidators: true }
    );
    // If the sale was not found, send a 404 response
    if (!result) {
      return res.status(404).send({ message: "Entry not found" });
    }
    // Send a success message
    res.send({ message: "Entry updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
