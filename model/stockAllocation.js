const mongoose = require("mongoose");
//schema for allocated stock
const stockAllocationSchema = new mongoose.Schema({
  kioskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
        // validate kiosk owner
      validator: async function (value) {
        const user = await mongoose.model("User").findById(value);
        return user && user.role === "kiosk owner";
      },
      message: (props) => `${props.value} is not a valid kiosk owner`,
    },
  },
  allocatedStock: { type: Number, required: true },// show allocated stock to kiosk owner
  dateAllocated: { type: Date, default: Date.now },// date of the allocated stock
});

const StockAllocation = mongoose.model(
  "StockAllocation",
  stockAllocationSchema
);

module.exports = StockAllocation;
