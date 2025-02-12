const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true, trim: true, minlength: 1 },
    image: { type: String },
    sent: { type: String, required: true, trim: true, minlength: 10 }
});

module.exports = mongoose.model('Message', MessageSchema);