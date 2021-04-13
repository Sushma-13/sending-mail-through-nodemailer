const express = require("express");
const cors = require("cors");
const contact = require("./contact");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/", contact);

app.listen(5000, () => console.log("Server Running"));