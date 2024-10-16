const mongoose = require('mongoose');
const { v6: uuid } = require('uuid');  // CommonJS syntax

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    uuid: { type: String, default: () => uuid() }
});

module.exports = mongoose.model('users', UserSchema);  // CommonJS export
