const mongoose = require("mongoose")
const generate = require("../helper/generate")

const chatShema = new mongoose.Schema({
   // user_id:String,
   user_id: String,
   room_chat_id: String ,
   content : String,
   images: Array ,
   deleted: {
    type: Boolean,
    default:false
   },
   deleteAt: Date


},{ timestamps: true })

const chat = mongoose.model("chat", chatShema, "chat")

module.exports = chat;