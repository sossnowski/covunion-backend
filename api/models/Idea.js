const mongoose = require('mongoose');

const ideaSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String},
    author: {type: String, required: true},
    votes: {type: Number}
});

module.exports = mongoose.model('Idea', ideaSchema);