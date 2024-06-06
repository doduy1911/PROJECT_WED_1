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



