const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    ideaId: {type: String, required: true},
    user: {type: String, required: true},
});

module.exports = mongoose.model('Vote', voteSchema);