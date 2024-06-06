const { response } = require("express")
const User = require("../../models/user.model")
const ForgotPassword = require("../../models/forgotPassword.mode")
const generateNumberHepper = require("../../helper/generate")
const sendMailHepper = require("../../helper/sendMail")
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
    // console.log(objectForgotPassword)
    const forgotPassword = new ForgotPassword(objectForgotPassword)
    await forgotPassword.save()
    // việc 1 : tạo mã otp và lưu thông tin yêu cầu vào connection

    // việc 2 : gửi mã otp qua email
    const subject = `Mã OTP Để Xác Minh `
    const html= `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #dddddd;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .content {
            margin-top: 20px;
            font-size: 16px;
            color: #333333;
        }
        .otp-code {
            display: inline-block;
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #666666;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            Xác Minh OTP
        </div>
        <div class="content">
            <p>Chào bạn,</p>
            <p>Để hoàn tất quá trình xác minh, vui lòng sử dụng mã OTP dưới đây:</p>
            <p class="otp-code">${otp}</p>
            <p>Lưu ý: Không chia sẻ mã OTP này với bất kỳ ai để bảo vệ tài khoản của bạn.</p>
            <p>Trân trọng,</p>
            <p>Đội ngũ hỗ trợ</p>
        </div>
        <div class="footer">
            <p>Nếu bạn không yêu cầu mã OTP này, vui lòng bỏ qua email này.</p>
        </div>
    </div>
</body>
</html>

    `

    sendMailHepper.sendMail(email,subject,html)


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

    res.redirect("/user/password/reset")
} 

module.exports.reset = (req , res) => {
    res.render("client/page/user/resetpass")
}
module.exports.resetPost = async (req , res) => {
    const password = req.body.password
    const tokenUser = req.cookies.tokenUser

    await User.updateOne({
        tokenUser: tokenUser
    },
{
    password: md5(password)
})

    // console.log(tokenUser)
    res.redirect("/")
}