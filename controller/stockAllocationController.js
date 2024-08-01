const StockAllocation = require("../model/stockAllocation");
const User = require("../model/users");
const { sendEmail } = require("./../emailService");

// Method to allocate stock to a kiosk owner
exports.allocateStock = async (req, res) => {
  try {
    const { kioskOwnerId, allocatedStock } = req.body;
    const kioskOwner = await User.findById(kioskOwnerId); // Find the kiosk owner by ID

    // Check if the kiosk owner exists and has the correct role
    if (!kioskOwner || kioskOwner.role !== "kiosk owner") {
      return res.status(400).send({ message: "Invalid kiosk owner" });
    }
    const emailContent = `
      Dear ${kioskOwner.name},\n\nYou have been allocated the following stock:
      ${JSON.stringify(
        allocatedStock
      )}\n\nPlease log in to your account to view the details.\nBest regards,\nCocoTracker.
    `;
    sendEmail(kioskOwner.email, "Stock Allocation Notification", emailContent);
    // Create and save a new stock allocation record
    const newAllocation = new StockAllocation({ kioskOwnerId, allocatedStock });
    const result = await newAllocation.save();

    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to get all stock allocations
exports.getAllAllocations = async (req, res) => {
  try {
    // Fetch all stock allocations and populate the kiosk owner details
    const allocations = await StockAllocation.find().populate(
      "kioskOwnerId",
      "name email"
    );
    res.send(allocations);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to get allocations for a specific kiosk owner
exports.getAllocatedStockByKioskOwner = async (req, res) => {
  try {
    const kioskOwnerId = req.params.kioskOwnerId;
    // Find allocations by kiosk owner ID and populate the kiosk owner details
    const allocatedStock = await StockAllocation.find({
      kioskOwnerId,
    }).populate("kioskOwnerId");
    res.json(allocatedStock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to delete a stock allocation by ID
exports.deleteAllocation = async (req, res) => {
  try {
    const allocationId = req.params.id; // Get the allocation ID from request parameters
    const result = await StockAllocation.findByIdAndDelete(allocationId);

    // Check if the allocation was found and deleted
    if (!result) {
      return res.status(404).send({ message: "Allocation not found" });
    }

    res.send({ message: "Allocation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to update a stock allocation by ID
exports.updateAllocation = async (req, res) => {
  try {
    const allocationId = req.params.id;
    const { kioskOwnerId, allocatedStock } = req.body;
    // Find the kiosk owner by ID and validate the role
    const kioskOwner = await User.findById(kioskOwnerId);
    if (!kioskOwner || kioskOwner.role !== "kiosk owner") {
      return res.status(400).send({ message: "Invalid kiosk owner" });
    }

    // Update the allocation by ID
    const result = await StockAllocation.findByIdAndUpdate(
      allocationId,
      { kioskOwnerId, allocatedStock },
      { new: true, runValidators: true }
    );
    // Check if the allocation was found and updated
    if (!result) {
      return res.status(404).send({ message: "Allocation not found" });
    }

    res.send({ message: "Allocation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
