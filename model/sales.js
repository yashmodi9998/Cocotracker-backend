const mongoose = require("mongoose");

// schema for the Sales collection
const salesSchema = new mongoose.Schema({
  quantitySold: { type: Number, required: true }, // Quantity of juice sold (required)
  date: { type: Date, required: true }, // Date of the sale (required)
  storeName: { type: String }, // Name of the store
  kioskOwner: { type: String }, // Name of the kiosk owner
  stockAllocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockAllocation",
    required: true,
  }, // Reference to the stock allocation
});

//  a model for the Sales collection
const Sales = mongoose.model("Sales", salesSchema);

// Export the Sales model
module.exports = Sales;
