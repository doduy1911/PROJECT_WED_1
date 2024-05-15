const mongoss = require("mongoose")
 module.exports.connect = async ()=>{
    try {
        await mongoss.connect(process.env.URL)
        console.log("kết nối thành công ")
        
    } catch (error) {
        console.log("kết nối thất bại")
        
    }
 }