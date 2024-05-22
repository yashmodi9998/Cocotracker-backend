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
    // Send the retrieved store data as response
    res.send(stores);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
