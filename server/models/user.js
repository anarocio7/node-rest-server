const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is needed to continue']
    },
    email: {
        type: String,
        required: [true, 'Email is needed to continue']
    },
    password: {
        type: String,
        required: [true, 'Password is mandatory']
    },
    image: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROL',
        required: false,
    },
    state: {
        type: Boolean,
        default: true,
        required: false
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('user', userSchema);