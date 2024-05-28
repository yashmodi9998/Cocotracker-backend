// import user from the modules folder
const User = require("../model/users");

// method to get all users
exports.getUser = async (req, res) => {
  try {
    // Query to find all users
    const users = await User.find();
    // send a response of users
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to add a new user
exports.addUser = async (req, res) => {
  try {
    // Create a new user with data from the request body
    const newUser = new User(req.body);
    // save the daya in a result
    const result = await newUser.save();
    // send result with response
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to delete a user
exports.deleteUser = async (req, res) => {
  try {
    // get the user ID from the request parameters
    const userId = req.params.id;
    // Find and delete the user with the specified ID from the database
    const result = await User.findByIdAndDelete(userId);
    // If the user was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    // Send a success message as a response
    res.send({ message: "user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// function to update a user
exports.updateUser = async (req, res) => {
  try {
    // get the user ID and data from the request parameters
    const userId = req.params.id;
    const updatedData = req.body;
    // Find and update the user with the specified ID in the database

    const result = await User.findByIdAndUpdate(
      userId,
      updatedData,
      // Return the updated document and run validators
      { new: true, runValidators: true }
    );
    // If the user was not found, send a 404 (not found) response
    if (!result) {
      return res.status(404).send({ message: "user not found" });
    }
    // Send a success message as a response
    res.send({ message: "user updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
