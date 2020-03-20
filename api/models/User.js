const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    finishedTask: {type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);