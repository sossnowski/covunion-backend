const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    advertisement: { type: mongoose.Schema.Types.ObjectId, ref: 'Advertisement', required: true },
    owner: {type: String, required: true},
    executor: {type: String, required: true},
    ownerDecision: {type: Boolean, default: false},
    executorDecision: {type: Boolean, default: false},
    ownerTelephone: {type: String, required: true},
    executorTelephone: {type: String, required: true},
});

module.exports = mongoose.model('Task', taskSchema);