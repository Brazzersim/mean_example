const mongoose = require("mongoose");
const _guests = require("./guests.js");

const userSchema = mongoose.Schema({
  "username": {type: String, required: true},
  "password": {type: String, required: true},
  "guests": [{ type: mongoose.Schema.Types.ObjectId, ref: 'guests' }]
});


const User = mongoose.model("users", userSchema);
exports.User = User;

exports.login = async (req, res) => {
  try {
    let data = await User.findOne({
      username: req.body.username,
      password: req.body.password
    });
    if(data) {
      data.guests = await _guests.Guests.find({user_id: data._id});
      res.status(200).json({user: data, success: true, message: "User succesfully retrieved!"});
    }
    else
      res.status(401).json({ user: null, success: false, message: "Wrong username or password!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: err.message });
  }
};


module.exports = exports;
