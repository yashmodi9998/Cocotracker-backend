const ReturnRequest = require("../model/returnRequest");
const StockAllocation = require("../model/stockAllocation");

// Create a return request
exports.requestReturn = async (req, res) => {
  const { stockAllocationId, returningStock, reason } = req.body;

  try {
    const newRequest = new ReturnRequest({
      stockAllocationId,
      returningStock,
      reason,
      status: "pending", 
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error placing return request:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    const { userId } = req.params;
    const requests = await ReturnRequest.find({ userId }).populate(
      "stockAllocationId"
    );
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching return requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
