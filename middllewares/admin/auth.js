const accounts = require('../../models/accounts.model')

module.exports.requireAuth = async (req,res,next)=>{
    console.log(req.cookies.token);
    if(!req.cookies.token){
        res.redirect("/admin/auth/login");
        return
    }
    const user = await accounts.findOne({
        token: req.cookies.token
    })
    if(!user){
        res.redirect("/admin/auth/login");
        return;
    }
    next()
}