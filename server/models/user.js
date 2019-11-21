const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

let Schema = mongoose.Schema;

let validRoles = {
    values: ['ADMIN_USER', 'USER_ROL', 'SUPER_USER'],
    message: '{VALUE} is not a valid rol'
};

let userSchema = new Schema({
    name: { type: String, required: [true, 'Name is needed to continue']},
    email: { type: String, unique: true, required: [true, 'Email is needed to continue']},
    password: { type: String, required: [true, 'Password is mandatory']},
    image: { type: String, required: false },
    rol: { type: String, default: 'USER_ROL', required: false, enum: validRoles },
    state: { type: Boolean, default: true, required: false },
    google: { type: Boolean, default: false }
});

// Return user information without the password

userSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

userSchema.plugin(uniqueValidator, {
    message: '{PATH} must be unique'
})

module.exports = mongoose.model('User', userSchema);