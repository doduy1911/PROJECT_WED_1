const accounts = require('../../models/accounts.model')
const Role = require('../../models/rolse.model')


module.exports.requireAuth = async (req,res,next)=>{
    // console.log(req.cookies.token);
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
    const role = await Role.findOne({
        _id : user.role_id
    }).select("title permissions")
    res.locals.user=user;
    res.locals.role=role;


    next()
}