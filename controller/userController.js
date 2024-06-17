// import user from the models folder
const User = require("../model/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
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
// function to register a new user
exports.registedUser = async (req, res) => {
  try {
    // use bcrypt package to encrypt password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new user with data from the request body and new hashedPassword
    const newUser = new User({
      ...req.body,
      password: hashedPassword, // Set the hashed password
    });
    // save the data in a result
    const result = await newUser.save();
    // creates a token with signature using email and a secret key which expires in 1 hour
    const token = jwt.sign({ email: newUser.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //send result with response
 
    res
      .status(201)
      .json({
        token,
        email: result.email,
        role: result.role,
        name: result.name,
      });
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
// method to login user
exports.loginUser = async (req, res) => {
  try {
    // store email and password
    const { email, password } = req.body;
    // find for user using email
    const user = await User.findOne({ email });
    // if not found, show as authentication failed
    if (!user) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    // check for the password usinf bcrypt to compare
    const passwordMatch = await bcrypt.compare(password, user.password);
    // if password is not match return authentication failed
    if (!passwordMatch) {
      return res.status(401).json({ error: "Authentication failed" });
    }
    // creates a token with signature using email and a secret key which expires in 1 hour
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    // send token as a response
    res
      .status(201)
      .json({ token, email: user.email, role: user.role, name: user.name });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
};
