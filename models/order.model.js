const mongoose = require("mongoose")
const generate = require("../helper/generate")

const orderShema = new mongoose.Schema({
   // user_id:String,
   cart_id:String,
   userInfo:{
    fullName:String,
    phone:String,
    address:String,

   },
   products:[
      {
      product_id:String,
      price:Number,
      quantity:Number,
      discountPercentage:Number
      }
   ]
},{ timestamps: true })

const order = mongoose.model("order", orderShema, "order")

module.exports = order;