const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    password: {type: String, required: true},
    data: String
});

module.exports = mongoose.model('User', userSchema);