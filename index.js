//Import modules
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");
const mongoose = require("mongoose");
//config dotenv package to read varibles from it
require("dotenv").config();
const PORT = process.env.PORT;

//Middleware
app.use(cors()); //CORS
app.use(express.json());
app.use("/", routes);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//To activate/ listen port for server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
