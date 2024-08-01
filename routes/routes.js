// Import required modules
const express = require("express");
const verify = require("./verifyRoutes");
const router = express.Router();

// Import controller files
const userController = require("../controller/userController");
const storeController = require("../controller/storeController");
const stockController = require("../controller/stockController");
const salesController = require("../controller/salesController");
const stockAllocationController = require("../controller/stockAllocationController");
const returnStockController = require("../controller/returnStockController");

// User routes
router.get("/", userController.getUser);
router.post("/register", userController.registedUser);
router.post("/login", userController.loginUser);
router.put("/:id", verify, userController.updateUser);
router.delete("/:id", verify, userController.deleteUser);

// Store routes
router.get("/stores", verify, storeController.getStores);
router.post("/stores", verify, storeController.addStore);
router.delete("/stores/:id", verify, storeController.deleteStore);
router.put("/stores/:id", verify, storeController.updateStore);

// Stock routes
router.get("/stock", verify, stockController.getStock);
router.post("/stock", verify, stockController.addStock);
router.delete("/stock/:id", verify, stockController.deleteStock);
router.put("/stock/:id", verify, stockController.updateStock);

// Sales routes
router.get("/sales", verify, salesController.getSales);
router.post("/sales", verify, salesController.addSale);
router.delete("/sales/:id", verify, salesController.deleteSale);
router.put("/sales/:id", verify, salesController.updateSale);

// Stock Allocation routes

//for admin
router.get(
  "/allocate-stock",
  verify,
  stockAllocationController.getAllAllocations
);
// for kiosk owner specific
router.get(
  "/allocate-stock/:kioskOwnerId",
  verify,
  stockAllocationController.getAllocatedStockByKioskOwner
);
router.post("/allocate-stock", verify, stockAllocationController.allocateStock);
router.delete(
  "/allocate-stock/:id",
  verify,
  stockAllocationController.deleteAllocation
);
router.put(
  "/allocate-stock/:id",
  verify,
  stockAllocationController.updateAllocation
);

router.post("/return-request", verify, returnStockController.requestReturn);
// Get all return requests
router.get(
  "/return-requests",
  verify,
  returnStockController.getAllReturnRequests
);

// Get return requests for a specific kiosk owner
router.get(
  "/return-requests/:kioskOwnerId",
  verify,
  returnStockController.getReturnRequestsByKioskOwner
);

// Approve a return request
router.put(
  "/approve-return-request/:id",
  verify,
  returnStockController.approveReturnRequest
);

// Reject a return request
router.delete(
  "/return-request/:id",
  verify,
  returnStockController.rejectReturnRequest
);

// Export router
module.exports = router;
