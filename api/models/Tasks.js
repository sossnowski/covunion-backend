const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    owner: {type: String, required: true},
    executor: {type: String, required: true},
    ownerDecision: {type: Boolean, default: false},
    executorDecision: {type: Boolean, default: false},
});

module.exports = mongoose.model('Task', taskSchema);