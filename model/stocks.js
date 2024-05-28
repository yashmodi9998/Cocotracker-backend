const mongoose = require("mongoose");

// Define the schema for the Stock collection
const stockSchema = new mongoose.Schema({
  supplierName: { type: String, required: true }, // Name of the supplier (required)
  date: { type: Date, required: true }, // Date of the transaction (required)
  quantityStock: { type: Number, required: true }, // Quantity of stock (required)
});

// a model for the Stock collection using the schema
const Stock = mongoose.model("Stock", stockSchema);

// Export the Stock model
module.exports = Stock;
