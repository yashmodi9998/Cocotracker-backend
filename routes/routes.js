//Import required modules
const express = require("express");
// router object
const router = express.Router();
//user controller file that handles logic for request
const userController = require("../controller/userController");
//user routes
router.get("/user", userController.getUser);
router.post("/user", userController.addUser);
router.delete("/user/:id", userController.deleteUser);
router.put("/user/:id", userController.updateUser);

//store controller file that handles logic for request
const storeController = require("../controller/storeController");

router.get("/stores", storeController.getStores);
router.post("/stores", storeController.addStore);
router.delete("/stores/:id", storeController.deleteStore);
router.put("/stores/:id", storeController.updateStore);

//stock controller file that handles logic for request
const stockController = require("../controller/stockController");
//stock routes
router.get("/stock", stockController.getStock);
router.post("/stock", stockController.addStock);
router.delete("/stock/:id", stockController.deleteStock);
router.put("/stock/:id", stockController.updateStock);

// export parameter as a router
module.exports = router;
