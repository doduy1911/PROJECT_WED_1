const mongoose = require("mongoose")
const generate = require("../helper/generate")

const accountsShema = new mongoose.Schema({
    fullname:String,
    email : String,
    password:String,
    token: {
        type: String,
        default: generate.generateString(30)
    },
    phone: String,
    avatar:String,
    status: String,
    role_id:String,

    deleted: {
        type: Boolean,
        default: false, 
    },
    deletedAt: Date
},{ timestamps: true })

const accounts = mongoose.model("accounts", accountsShema, "accounts")

module.exports = accounts;