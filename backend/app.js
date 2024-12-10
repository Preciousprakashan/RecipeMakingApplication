const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

require('dotenv').config();
const PORT = process.env.PORT;

const app = express();
require('./db/connection.js');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const userRoute = require('./routes/routes.js');
app.use('/recipe',userRoute);



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
