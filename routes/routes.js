//Import required modules
const express = require("express");
// router object
const router = express.Router();
//store controller file that handles logic for request
const storeController = require("../controller/storeController");
//store routes
router.get("/stores", storeController.getStores);
router.post("/stores", storeController.addStore);
router.delete("/stores/:id", storeController.deleteStore);
router.put("/stores/:id", storeController.updateStore);

// export parameter as a router
module.exports = router;
