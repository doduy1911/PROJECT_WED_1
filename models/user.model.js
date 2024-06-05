const mongoose = require("mongoose")
const generate = require("../helper/generate")

const userSchema = new mongoose.Schema({
    fullName:String,
    email : String,
    password:String,
    tokenUser: {
        type: String,
        default: generate.generateString(30)
    },
    phone: String,
    avatar:String,
    status: String,
    deleted: {
        type: String,
        default: "active ", 
    },
    deletedAt: Date
},{ timestamps: true })

const user = mongoose.model("user", userSchema, "user")

module.exports = user;