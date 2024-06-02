const StockAllocation = require("../model/stockAllocation");
const ReturnRequest = require("../model/returnRequest");

// FOR ADMIN
// to allocate stock to kiosk owner
exports.allocateStock = async (req, res) => {
  try {
    // to get relevent fields from body params
    const { kioskOwnerId, allocatedStock } = req.body;
    // to set values of stock
    const stockAllocation = new StockAllocation({
      kioskOwnerId,
      allocatedStock,
    });
    // to save value to db
    await stockAllocation.save();
    // send response of success
    res.status(201).send("Stock allocated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// FOR KIOSK OWNER
// to place a return request
exports.requestReturn = async (req, res) => {
  try {
    // to get relevent fields from body params
    const { kioskOwnerId, remainingStock, reason } = req.body;
    // to set values for return request
    const returnRequest = new ReturnRequest({
      kioskOwnerId,
      remainingStock,
      reason,
    });
    // to save value to db
    await returnRequest.save();
    console.log("shdjs");
    res.status(201).send("Return request submitted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// FOR ADMIN
// to approve a return request
exports.approveReturn = async (req, res) => {
  try {
    // to get relevent fields from body params
    const requestId = req.params.id;
    // to update field in db
    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      requestId,
      { status: "approved", dateApproved: Date.now() },
      { new: true }
    );
    // If the return request was not found, send a 404 (not found) response
    if (!returnRequest) {
      return res.status(404).send({ message: "request not found" });
    }
    // Send a success message as a response
    res.send({ message: "request approved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// method to get approved return requests
exports.getApprovedReturns = async (req, res) => {
  try {
    // Query to find all approved stocks
    const approvedReturns = await ReturnRequest.find({ status: "approved" });
    res.send(approvedReturns);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// method to get pending return requests
exports.getPendingReturns = async (req, res) => {
  try {
    // Query to find all pending requests
    const pendingReturns = await ReturnRequest.find({ status: "pending" });
    res.send(pendingReturns);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// method to get allocated stock
exports.getAllocatedStock = async (req, res) => {
  try {
    // Query to find allocated stocks
    const allocatedStock = await StockAllocation.find();
    res.send(allocatedStock);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
