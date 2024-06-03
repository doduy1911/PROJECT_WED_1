const mongoose = require("mongoose")


const cardSchema = new mongoose.Schema({
   user_id : String,
   products:[{
    product_id:String,
    quantity:Number

   }]
},
   { timestamps: true })

const card = mongoose.model("card", cardSchema, "card")

module.exports = card;