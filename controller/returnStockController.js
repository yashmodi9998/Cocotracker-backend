const ReturnRequest = require("../model/returnRequest");
const StockAllocation = require("../model/stockAllocation");
const { sendEmail } = require("./../emailService");

// Create a return request
exports.requestReturn = async (req, res) => {
  const { stockAllocationId, returningStock, reason } = req.body;

  try {
     // Find the stock allocation by ID and populate the kiosk owner information
    const stockAllocation = await StockAllocation.findById(
      stockAllocationId
    ).populate("kioskOwnerId");
    if (!stockAllocation) {
      // Return 404 if stock allocation not found
      return res.status(404).send("Stock allocation not found");
    }
 // Create a new return request
    const newRequest = new ReturnRequest({
      stockAllocationId,
      returningStock,
      reason,
      status: "pending",//initial status pending
    });

    await newRequest.save();

    // Send email notification to the kiosk owner
    sendEmail(
      stockAllocation.kioskOwnerId.email,
      "Return Request Placed",
      `Dear ${stockAllocation.kioskOwnerId.name},\n\nYour return request for ${returningStock} units of stock has been placed successfully.\n\nReason: ${reason}\n\nRegards,\nCocoTracker`
    );

    res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error placing return request:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Fetch all return requests
exports.getAllReturnRequests = async (req, res) => {
  try {
     // Fetch all return requests and populate the related stock allocation and kiosk owner details
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
    const { userId } = req.params;// Get the user ID from the request parameters
    const requests = await ReturnRequest.find({ userId }).populate(
      "stockAllocationId"
    ); // Find return requests by user ID
    res.status(200).json(requests);
  } catch (error) {
    console.error("Error fetching return requests:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Approve a return request
exports.approveReturnRequest = async (req, res) => {
  try {
    const requestId = req.params.id; // Get the request ID from the request parameters
    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      requestId,
      { status: "approved", dateApproved: Date.now() },
      { new: true }
    ).populate({
      path: "stockAllocationId",
      populate: { path: "kioskOwnerId" },
    });// Update the status to approved and set the approval date

    if (!returnRequest) {
      return res.status(404).send("Return request not found");
    }

    // Send email notification to the kiosk owner
    sendEmail(
      returnRequest.stockAllocationId.kioskOwnerId.email,
      "Return Request Approved",
      `Dear ${returnRequest.stockAllocationId.kioskOwnerId.name},\n\nYour return request for ${returnRequest.returningStock} units of stock has been approved.\n\nRegards,\nYour Company`
    );

    res.json(returnRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Reject a return request
exports.rejectReturnRequest = async (req, res) => {
  try {
    const requestId = req.params.id; // Get the request ID from the request parameters
    const returnRequest = await ReturnRequest.findByIdAndUpdate(
      requestId,
      { status: "rejected" },// Update the status to rejected
      { new: true }
    ).populate({
      path: 'stockAllocationId',
      populate: { path: 'kioskOwnerId' }
    });

    if (!returnRequest) {
      return res.status(404).send("Return request not found");
    }

    // Send email notification to the kiosk owner
    sendEmail(
      returnRequest.stockAllocationId.kioskOwnerId.email,
      "Return Request Rejected",
      `Dear ${returnRequest.stockAllocationId.kioskOwnerId.name},\n\nYour return request for ${returnRequest.returningStock} units of stock has been rejected.\n\nRegards,\nYour Company`
    );

    res.json(returnRequest);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};