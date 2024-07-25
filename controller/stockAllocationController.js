const StockAllocation = require("../model/stockAllocation");
const User = require("../model/users");

// Method to allocate stock to a kiosk owner
exports.allocateStock = async (req, res) => {
  try {
    const { kioskOwnerId, allocatedStock } = req.body;
    const kioskOwner = await User.findById(kioskOwnerId);

    if (!kioskOwner || kioskOwner.role !== "kiosk owner") {
      return res.status(400).send({ message: "Invalid kiosk owner" });
    }

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
    const allocatedStock = await StockAllocation.find({ kioskOwnerId }).populate("kioskOwnerId");
    res.json(allocatedStock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Method to delete a stock allocation by ID
exports.deleteAllocation = async (req, res) => {
  try {
    const allocationId = req.params.id;
    const result = await StockAllocation.findByIdAndDelete(allocationId);

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

    const kioskOwner = await User.findById(kioskOwnerId);
    if (!kioskOwner || kioskOwner.role !== "kiosk owner") {
      return res.status(400).send({ message: "Invalid kiosk owner" });
    }

    const result = await StockAllocation.findByIdAndUpdate(
      allocationId,
      { kioskOwnerId, allocatedStock },
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).send({ message: "Allocation not found" });
    }

    res.send({ message: "Allocation updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
