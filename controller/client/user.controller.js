const { response } = require("express")
const User = require("../../models/user.model")
const md5 = require("md5")
module.exports.register = (req , res) => {
    res.render("client/page/user/register")
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