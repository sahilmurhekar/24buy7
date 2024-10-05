var express = require("express");
var app=express();
var port=5000;
var bodyParser=require('body-parser');
const path = require('path');
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
var url="mongodb://localhost:27017/";
var mongoose=require("mongoose");
mongoose.set('strictQuery',true);
mongoose.connect(url);

var nameschema= new mongoose.Schema({
    Fname:String,
    Lname:String,
    Email:String,
    Phone:Number,
    Subject:String,
    Message:String
});

var User= new mongoose.model('vending',nameschema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
  });

app.post("/adddata",async(req,res)=>{
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

app.listen(port, () => {
      console.log("Server listening on port " + port);
});