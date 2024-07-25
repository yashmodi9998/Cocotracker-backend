const mongoose = require("mongoose");

const stockAllocationSchema = new mongoose.Schema({
  kioskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  allocatedStock: { type: Number, required: true },
  dateAllocated: { type: Date, default: Date.now },
  returnRequestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ReturnRequest",
  },
});

const StockAllocation = mongoose.model(
  "StockAllocation",
  stockAllocationSchema
);

module.exports = StockAllocation;
