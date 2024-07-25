const ReturnRequest = require("../model/returnRequest");
const StockAllocation = require("../model/stockAllocation");

// Create a return request
exports.requestReturn = async (req, res) => {
  try {
    const { stockAllocationId, remainingStock, reason } = req.body;
    const returnRequest = new ReturnRequest({
      stockAllocationId,
      remainingStock,
      reason,
    });
    const savedRequest = await returnRequest.save();

    // Update stock allocation with the return request ID
    await StockAllocation.findByIdAndUpdate(
      stockAllocationId,
      { returnRequestId: savedRequest._id },
      { new: true }
    );

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Fetch all return requests
exports.getAllReturnRequests = async (req, res) => {
  try {
    const returnRequests = await ReturnRequest.find().populate({
      path: "stockAllocationId",
      populate: { path: "kioskOwnerId" },
    });
    res.json(returnRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Fetch return requests for a specific kiosk owner
exports.getReturnRequestsByKioskOwner = async (req, res) => {
  try {
    const kioskOwnerId = req.params.kioskOwnerId;
    const stockAllocations = await StockAllocation.find({ kioskOwnerId }).select('_id');
    const returnRequests = await ReturnRequest.find({
      stockAllocationId: { $in: stockAllocations }
    }).populate({
      path: 'stockAllocationId',
      populate: { path: 'kioskOwnerId' }
    });
    res.json(returnRequests);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Approve a return request
exports.approveReturnRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      requestId,
      { status: "approved", dateApproved: Date.now() },
      { new: true }
    ).populate("stockAllocationId");
    if (!returnRequest) {
      return res.status(404).send("Return request not found");
    }
    res.json(returnRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// Reject a return request
exports.rejectReturnRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { new: true }
    ).populate("stockAllocationId");
    if (!returnRequest) {
      return res.status(404).send("Return request not found");
    }
    res.json(returnRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
