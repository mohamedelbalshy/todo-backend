const mongoose = require('mongoose');
const Schema = mongoose.Schema;

TodoSchema = new Schema({
    title: {
        type: String
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    removed: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('Todo', TodoSchema);