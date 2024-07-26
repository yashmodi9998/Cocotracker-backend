const mongoose = require("mongoose");

const returnRequestSchema = new mongoose.Schema({
  stockAllocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StockAllocation",
    required: true,
  },
  returningStock: { type: Number, required: true },
  reason: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  dateRequested: { type: Date, default: Date.now },
  dateApproved: { type: Date },
});

const ReturnRequest = mongoose.model("ReturnRequest", returnRequestSchema);

module.exports = ReturnRequest;
