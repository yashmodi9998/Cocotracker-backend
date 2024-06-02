//Import required modules
const express = require("express");
// router object
const router = express.Router();

//user controller file that handles logic for request
const userController = require("../controller/userController");
router.get("/", userController.getUser);
router.post("/", userController.addUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);

//store controller file that handles logic for request
const storeController = require("../controller/storeController");
router.get("/stores", storeController.getStores);
router.post("/stores", storeController.addStore);
router.delete("/stores/:id", storeController.deleteStore);
router.put("/stores/:id", storeController.updateStore);

//stock controller file that handles logic for request
const stockController = require("../controller/stockController");
router.get("/stock", stockController.getStock);
router.post("/stock", stockController.addStock);
router.delete("/stock/:id", stockController.deleteStock);
router.put("/stock/:id", stockController.updateStock);

//sales controller file that handles logic for request
const salesController = require("../controller/salesController");
router.get("/sales", salesController.getSales);
router.post("/sales", salesController.addSale);
router.delete("/sales/:id", salesController.deleteSale);
router.put("/sales/:id", salesController.updateSale);

//returnStock controller file that handles logic for request
const returnStockController = require("../controller/returnStockContoller");

router.post("/allocate", returnStockController.allocateStock); // Route for stock allocation
router.post("/return-request", returnStockController.requestReturn); // Route for return request
router.put("/approve-return/:id", returnStockController.approveReturn); // Route for approving return request
router.get(
  "/return-requests/approved",
  returnStockController.getApprovedReturns
); //Route to get approved requests
router.get("/return-requests/pending", returnStockController.getPendingReturns); //Route to get pending requests
router.get("/allocated-stock", returnStockController.getAllocatedStock); //Route to get allocated stocks
// export parameter as a router
module.exports = router;
