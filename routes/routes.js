//Import required modules
const express = require("express");
const router = express.Router();
const dbCon = require("../connection/dbCon");

//Middlewares
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

//Router for stores
router.get("/stores", async (req, res) => {
  try {
    // Call the getStores method
    let stores = await dbCon.getStores();
    // send data as response
    res.send(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// Add a new store
router.post("/stores", async (req, res) => {
  try {
    // parameter that reads body having store detail
    const newStore = req.body;
    // call addStore method by passing newStore as argument.
    const result = await dbCon.addStore(newStore);
    // send data as response
    res.status(201).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// To Delete a store
router.delete("/stores/:id", async (req, res) => {
  try {
    // parameter that reads parameter id from the url for storeId
    const storeId = req.params.id;
    //Call delete store method by passing storeId
    const result = await dbCon.deleteStore(storeId);
    // send data as response
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// Update a store
router.put("/stores/:id", async (req, res) => {
  try {
    // parameter that reads parameter id from the url for storeId
    const storeId = req.params.id;
    // parameter that reads body having store detail
    const updatedData = req.body;
    // Variable that stores response for updateStore
    const result = await dbCon.updateStore(storeId, updatedData);
    //if count of resul is 0 set status as 404 and with a message store not found.
    if (result.matchedCount === 0) {
      return res.status(404).send({ message: "Store not found" });
    }
    // else set response as 200
    res.status(200).send({ message: "Store updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// export parameter as a router
module.exports = router;
