const mongoose = require("mongoose");

const guestSchema = mongoose.Schema({
    "user_id": [{ type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    "name": {type: String, required: true},
    "surname": {type: String, required: true},
    "email": {type: String, required: true},
    "phone": String,
    "address": String,
    "city": String,
    "zip": String
});

const Guests = mongoose.model("guests", guestSchema);
exports.Guests = Guests;

exports.getGuest = async (req, res) => {
    try {
        let data = await Guests.findById(req.params.id);
        res.status(200).json({ guest: data, success: true, message: "Guest succesfully retrieved!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getUserGuests = async (req, res) => {
    try {
        let data = await Guests.find({user_id: req.query.user_id});
        res.status(200).json({ guests: [...data], success: true, message: "Guests succesfully retrieved!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.createGuest = async (req, res) => {
    try {
        const data = new Guests(req.body.data);
        data.save();
        res.status(201).json({ guest: data, success: true, message: "Guest succesfully added!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.deleteGuest = async (req, res) => {
    try {
        Guests.findByIdAndDelete(req.params.id, () => {});
        res.status(200).json({ success: true, message: "Guest succesfullly deleted!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateGuest = async (req, res) => {
    try {
        const data = await Guests.findByIdAndUpdate(req.params.id, req.body.data, () => {}).clone();
        res.status(200).json({ guest: data, success: true, message: "Guest succesfully updated!" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = exports;
