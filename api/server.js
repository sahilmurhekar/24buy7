const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const serverless = require("serverless-http");
require("dotenv").config(); // Load environment variables from .env file

// Create an Express app
const app = express();
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose configuration
mongoose.set("strictQuery", true);
const MONGO_URI = process.env.MONGO_URI; // Use environment variable for MongoDB URI

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Schema and model setup
const nameschema = new mongoose.Schema({
  Fname: String,
  Lname: String,
  Email: String,
  Phone: Number,
  Subject: String,
  Message: String
});

const User = mongoose.model("vending", nameschema);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

// POST route to save data
app.post("/adddata", async (req, res) => {
  try {
    const myData = new User(req.body);
    await myData.save(); // Wait for save operation to complete
    res.status(200).send("Name saved to database");
    console.log("Data saved:", myData);
  } catch (err) {
    res.status(500).send("Unable to save to database");
    console.error("Error saving data:", err);
  }
});

// Export the app as a serverless function handler
module.exports = serverless(app);
