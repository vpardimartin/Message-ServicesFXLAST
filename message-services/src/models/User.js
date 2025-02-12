const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true, minlength: 1, unique: true },
    password: { type: String, required: true, minlength: 4 },
    image: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);