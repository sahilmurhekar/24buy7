var express = require("express");
var app = express();
var bodyParser = require('body-parser');
const path = require('path');

// Serve the static files from the build directory
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose configuration
var mongoose = require("mongoose");
mongoose.set('strictQuery', true);

// Replace with your actual MongoDB connection string from MongoDB Atlas or other service
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Schema and model setup
var nameschema = new mongoose.Schema({
  Fname: String,
  Lname: String,
  Email: String,
  Phone: Number,
  Subject: String,
  Message: String
});

var User = new mongoose.model('vending', nameschema);

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

// POST route to save data
app.post("/adddata", async (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("Name saved to database");
      console.log("saved");
    })
    .catch(err => {
      res.status(400).send("Unable to save to database");
    });
});

// Export the app as a serverless function handler
module.exports = app;
