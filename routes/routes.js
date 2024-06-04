//Import required modules
const express = require("express");
const verify = require("./verifyRoutes");
// router object
const router = express.Router();

//user controller file that handles logic for request
const userController = require("../controller/userController");
router.get("/", verify, userController.getUser);
router.post("/register", userController.registedUser);
router.post("/login", userController.loginUser);
router.delete("/:id", verify, userController.deleteUser);
router.put("/:id", verify, userController.updateUser);

//store controller file that handles logic for request
const storeController = require("../controller/storeController");
router.get("/stores", verify, storeController.getStores);
router.post("/stores", verify, storeController.addStore);
router.delete("/stores/:id", verify, storeController.deleteStore);
router.put("/stores/:id", verify, storeController.updateStore);

//stock controller file that handles logic for request
const stockController = require("../controller/stockController");
router.get("/stock", verify, stockController.getStock);
router.post("/stock", verify, stockController.addStock);
router.delete("/stock/:id", verify, stockController.deleteStock);
router.put("/stock/:id", verify, stockController.updateStock);

//sales controller file that handles logic for request
const salesController = require("../controller/salesController");
router.get("/sales", verify, salesController.getSales);
router.post("/sales", verify, salesController.addSale);
router.delete("/sales/:id", verify, salesController.deleteSale);
router.put("/sales/:id", verify, salesController.updateSale);

//returnStock controller file that handles logic for request
const returnStockController = require("../controller/returnStockContoller");

router.post("/allocate", verify, returnStockController.allocateStock); // Route for stock allocation
router.post("/return-request", verify, returnStockController.requestReturn); // Route for return request
router.put("/approve-return/:id", verify, returnStockController.approveReturn); // Route for approving return request
router.get(
  "/return-requests/approved",
  verify,
  returnStockController.getApprovedReturns
); //Route to get approved requests
router.get(
  "/return-requests/pending",
  verify,
  returnStockController.getPendingReturns
); //Route to get pending requests
router.get("/allocated-stock", verify, returnStockController.getAllocatedStock); //Route to get allocated stocks
// export parameter as a router
module.exports = router;
