const mongoose = require("mongoose");

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user (required)
  email: { type: String, required: true, unique: true }, // Email address of the user (required, unique)
  phoneNumber: { type: String }, // Phone number of the user 
  password: { type: String, required: true }, // Password for user authentication (required)
  role: {
    type: String,
    enum: ["admin", "kiosk owner"],
    required: true,
    default: "kiosk owner",
  }, // Role of the user (admin/kiosk owner) (required)
});

// Create a model for the User collection using the schema
const User = mongoose.model("User", userSchema);

// Export the User model
module.exports = User;
