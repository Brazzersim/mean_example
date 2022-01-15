const bodyParser = require("body-parser");
const express = require("express");
const _users = require("./models/users.js");
const _guests = require("./models/guests.js");
const mongoose = require('mongoose');
const uri = "mongodb+srv://root:root@cluster0.iw1qr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
  console.log('DB connected succesfully!');
}).catch((error) => {
  console.log('DB ERROR: ' + error);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  next();
});

//USER
app.post("/api/login", (req, res, next) => {
  _users.login(req, res);
});


//GUESTS
app.post("/api/guest", (req, res, next) => {
  _guests.createGuest(req, res);
});
app.get("/api/guest", (req, res, next) => {
  _guests.getUserGuests(req, res);
});
app.get("/api/guest/:id", (req, res, next) => {
  _guests.getGuest(req, res);
});
app.delete("/api/guest/:id", (req, res, next) => {
  _guests.deleteGuest(req, res);
});
app.put("/api/guest/:id", (req, res, next) => {
  _guests.updateGuest(req, res);
});


module.exports = app;
