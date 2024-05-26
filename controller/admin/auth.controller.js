const accounts = require('../../models/accounts.model')
const md5= require("md5")

module.exports.index=(req, res) => {
    // chỗ này e nên dùng res.render()
    res.render("admin/page/login/index",{
        titlepage: "Đăng nhập"
    });
}
module.exports.indexPost= async(req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    const password =  req.body.password;
    const user = await accounts.findOne({
        email: email,
        deleted: false
    })
    // console.log(user);
    // console.log(md5(password));
    // console.log(user)

    if(!user){
        req.flash("error","email Không tồn tại")
        res.redirect("back")
        return;
    }
    if(md5(password) != user.password){
        req.flash("error","Mật khẩu không đúng")
        res.redirect("back")
        return;
    }
    if(user.status == "inactive"){
        req.flash("error","Tài khoản chưa được kích hoạt")
        res.redirect("back")
        return;
    }
    req.flash("info","Đăng nhập thành công")
    res.cookie("token", user.token)
    res.redirect("/admin/dashboard")
}