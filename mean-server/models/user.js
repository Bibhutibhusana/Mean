const mongoose = require('mongoose')
const schema = mongoose.Schema
const userSchema = new mongoose.Schema({
    email: { type: "string" },
    password: { type: "string" }
})

module.exports = mongoose.model('user',userSchema,'users')