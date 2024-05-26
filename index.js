//Import modules
const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");

//config dotenv package to read varibles from it
require("dotenv").config();
const PORT = process.env.PORT;

//Middleware
app.use(cors()); //CORS
app.use(express.json());
app.use("/", routes);

//To activate/ listen port for server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
