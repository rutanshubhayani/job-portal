const mongoose = require('mongoose');
const { v6: uuid } = require('uuid');

const UserShema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    uuid: { type: String, default: () => uuid() }
});

module.exports = mongoose.Schema('users', UserShema);