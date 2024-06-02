const mongoose = require("mongoose");
// schema for return requests
const returnRequestSchema = new mongoose.Schema({
  kioskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      // to validate kiosk owner
      validator: async function (value) {
        const user = await mongoose.model("User").findById(value);
        return user && user.role === "kiosk owner";
      },
      message: (props) => `${props.value} is not a valid kiosk owner`,
    },
  },
  remainingStock: { type: Number, required: true }, //remaing stock
  reason: { type: String }, //reason for return
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }, //status of the request
  dateRequested: { type: Date, default: Date.now }, //date of the request
  dateApproved: { type: Date }, //date of return request approved
});

const ReturnRequest = mongoose.model("ReturnRequest", returnRequestSchema);

module.exports = ReturnRequest;
