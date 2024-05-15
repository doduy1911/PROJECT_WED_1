module.exports.createPost=(req,res,next)=>{
    if(!req.body.title){
        req.flash("error", `Tiêu Đề không được để trống`);
        res.redirect("back");
        return;


    }
    if(req.body.title.length<5){
        req.flash("error", `Tiêu Đề phải từ 5 kí tự trở nên`);
        res.redirect("back");
        return;
        

    }
    next()
}


