const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    id: mongoose.Types.ObjectId,
    title: {type: String, required: true},
    description: {type: String},
    user: {type: String, required: true},
    userTelephone: {type: String, required: ''},
    localization: {type: String, required: true},
    address: {type: String, required: true},
    coordinates: {type: String, required: true},
    date: {type: Date, required: true},
    needHelp: {type: Boolean, required: true}
});

module.exports = mongoose.model('Advertisement', adSchema);