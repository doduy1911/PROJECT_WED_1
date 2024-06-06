const mongoose = require("mongoose")
const generate = require("../helper/generate")

const forgotPasswordShema = new mongoose.Schema({
    email:String,
    otp:String,
    expiresAt:{
        type:Date,
        expires:180
    }
  
},{ timestamps: true })

const forgotPassword = mongoose.model("forgotPassword", forgotPasswordShema, "forgotPassword")

module.exports = forgotPassword;