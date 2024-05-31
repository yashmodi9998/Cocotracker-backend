const mongoose = require("mongoose");

// Define the schema for the Sales collection
const salesSchema = new mongoose.Schema({
  quantitySold: { type: Number, required: true }, // Quantity of juice sold (required)
  date: { type: Date, required: true }, // Date of the sale (required)
  storeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Stores",
    required: true,
  }, // Identifier for the store (required)
  kioskOwnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async function (value) {
        const user = await mongoose.model("User").findById(value);
        return user && user.role === "kiosk owner";
      },
      message: (props) => `${props.value} is not a valid kiosk owner`,
    },
  }, // Identifier for the kiosk owner (required)
  storeName: { type: String }, // Name of the store (populated based on storeId)
  kioskOwner: { type: String }, // Name of the kiosk owner (populated based on kioskOwnerId)
});

// Populate storeName and kioskOwner fields based on storeId and kioskOwnerId
salesSchema.pre("save", async function (next) {
  try {
    // variable that import models
    const Store = mongoose.model("Stores");
    const User = mongoose.model("User");
    // variables to retrieve store and user collection by id
    const store = await Store.findById(this.storeId);
    const user = await User.findById(this.kioskOwnerId);
    // if store or user is not found
    if (!store || !user) {
      throw new Error("Store or user not found");
    }
    console.log(user.name + " nd " + store.name);
    // set storename and kioskowner from the collection
    this.storeName = store.name;
    this.kioskOwner = user.name;
    // take request to the next middleware
    next();
  } catch (error) {
    next(error);
  }
});

//  a model for the Sales collection
const Sales = mongoose.model("Sales", salesSchema);

// Export the Sales model
module.exports = Sales;
