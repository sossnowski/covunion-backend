const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    advertisementId: {type: String, required: true},
    owner: {type: String, required: true},
    executor: {type: String, required: true},
    ownerDecision: {type: Boolean, default: false},
    executorDecision: {type: Boolean, default: false},
    ownerTelephone: {type: string, required: true},
    executorTelephone: {type: string, required: true},
});

module.exports = mongoose.model('Task', taskSchema);