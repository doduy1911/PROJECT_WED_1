module.exports.createPost=(req,res,next)=>{
    if(!req.body.fullName){
        req.flash("error", `Họ tên không được để trống`);
        res.redirect("back");
        return;


    }
    if(!req.body.email){
        req.flash("error", `email không được để trống`);
        res.redirect("back");
        return;


    }
    if(!req.body.password) {
        req.flash("error", `PassWord không được để trống`);
        res.redirect("back");
        return;


    }
    if(req.body.fullName.length<5){
        req.flash("error", `Tiêu Đề phải từ 5 kí tự trở nên`);
        res.redirect("back");
        return;
        

    }
    next()
}

module.exports.loginPost=(req,res,next)=>{

    if(!req.body.email){
        req.flash("error", `email không được để trống`);
        res.redirect("back");
        return;


    }
    if(!req.body.password) {
        req.flash("error", `PassWord không được để trống`);
        res.redirect("back");
        return;


    }

    next()
}

module.exports.forgotPassword=(req,res,next)=>{

    if(!req.body.email){
        req.flash("error", `email không được để trống`);
        res.redirect("back");
        return;


    }


    next()
}

module.exports.forgotPasswordPost=(req,res,next)=>{

    if(!req.body.password){
        req.flash("error", `Mật Khẩu không được để trống`);
        res.redirect("back");
        return;


    }
    if(!req.body.comfimpassword){
        req.flash("error", `Mật Khẩu không được để trống`);
        res.redirect("back");
        return;


    }  if(req.body.password != req.body.comfimpassword ){
        req.flash("error", `Mật Khẩu không trùng khớp`);
        res.redirect("back");
        return;


    }


    next()
}

module.exports.auth = (req,res,next) =>{
    const tokenID = req.cookies.tokenUser
    if(!tokenID){
        res.redirect("/user/loign")
        return ;
    }
    next();
}




