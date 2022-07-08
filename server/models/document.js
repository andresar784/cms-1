const mongoose = require('mongoose');

const documentsSchema =  mongoose.Schema({
    id: { type: String, required: true},
    children: [{id: { type: String, required: true}, name: { type: String, required: true }, url: { type: String }}],
    name: { type: String, required: true },
    url: { type: String },
})

module.exports = mongoose.model('Document', documentsSchema); 