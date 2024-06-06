const { response } = require("express")
const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgotPassword.mode")
const generateNumberHepper = require("../../helper/generate")

const md5 = require("md5")
module.exports.register = (req , res) => {
    res.render("client/page/user/register",{
        titlepage : "Đăng Ký "
    })
}
module.exports.registerPost =  async(req , res) => {
    // console.log(req.body)
    const exstEmail = await User.findOne({
        email: req.body.email,
        deleted: false
    })
    if(exstEmail){
        req.flash("error","email đã tồn tại")
        res.redirect("back")
        return;
    }
    req.body.password = md5(req.body.password)
    const user = new User(req.body)
    await user.save()
    // console.log(user )
    res.cookie("tokenUser", user.tokenUser)
    res.redirect("/")
}
module.exports.loign = (req , res) => {

    console.log(req.body)
    res.render("client/page/user/loign",{
        titlepage: "Đăng Nhập"
    })
}
module.exports.loignPost = async (req , res) => {
   const email = req.body.email
   const password = req.body.password
   const user = await User.findOne({
       email: email,
       deleted: false
   })

   if(!user.email) {
    req.flash("error","1 email hoặc mật khẩu không đúng")
    res.redirect("back")
    return;
   }

   if(md5(password) != user.password) {
    req.flash("error"," 2 email hoặc mật khẩu không đúng")
    res.redirect("back")
    return;
   }
   if(user.status == "inactive") {
    req.flash("error","3 Tài Khoản Đăng Bị khóa")
    res.redirect("back")
    return;
   }
   res.cookie("tokenUser", user.tokenUser)
// console.log(user)
// console.log(password)
    res.redirect("/")
} 

module.exports.logout = (req , res) => {
    res.clearCookie("tokenUser")
    res.redirect("/")
}

module.exports.forgot = async (req , res) => {
    res.render("client/page/user/forgotPassword", {
        titlepage: "Quên Mật Khẩu"
    })
    
}
module.exports.forgotPost = async (req , res) => {
    console.log(req.body.email);

    const email = req.body.email
    const user = await User.findOne({
        email: email,
        deleted: false
    })
    if(!user){
        req.flash("error","email không tồn tại")
        res.redirect("back")
        return;
    }
    const otp = generateNumberHepper.generateNumber(5)
    const objectForgotPassword = {
        email:email,
        otp:otp,
        expiresAt:Date.now()
    }
    console.log(objectForgotPassword)
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    // việc 1 : tạo mã otp và lưu thông tin yêu cầu vào connection

    // việc 2 : gửi mã otp qua email
    // việc 3 : lấy mã otp từ email
    // việc 4 : so sánh mã otp từ email với mã otp từ connection
    // việc 5 : nếu mã otp từ email và mã otp từ connection trùng nhau thì xóa mã otp từ connection
    // việc 6 : nếu mã otp từ email và mã otp từ connection trùng nhau thì xóa mã otp từ connection
    // việc 7 : nếu mã otp từ email và mã otp từ connection trùng nhau thì xóa mã otp từ connection
    res.redirect(`/user/password/otp?email=${email}`)
    
}

module.exports.otp = async (req , res) => {
    const email = req.query.email

    res.render("client/page/user/otp",{
        titlepage: "Mã OTP",
        email: email
    })
}

module.exports.otpPost = async (req , res) => {
    const email = req.body.email
    const otp = req.body.otp

    const result = await ForgotPassword.findOne(
        { 
            email: email,
            otp:otp

        }

    )

    if(!result){
        req.flash("error","Mã OTP không đúng")
        res.redirect("back")
        return;
    }
    const user = await User.findOne({
        email: email,
        
    })

    res.cookie("tokenUser",user.tokenUser)

    res.redirect("user/password/reset")
}