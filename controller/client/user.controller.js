const { response } = require("express")
const User = require("../../models/user.model")
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
console.log(user)
console.log(password)
    res.redirect("/")
} 