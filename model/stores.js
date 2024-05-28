const mongoose = require("mongoose");
// schema for store
const storeSchema = new mongoose.Schema({
  storeName: {
    type: String,
    required: true,unique: true
  },
  address: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: true,
  },
});
//make a model using mongoose model.
const Store = mongoose.model("Stores", storeSchema);

module.exports = Store;
