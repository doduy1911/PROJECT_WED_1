module.exports.index = (req ,res) => {
    res.render("admin/page/my-account/index.pug",{
        titlepage: "Thông tin tài khoản"
    })
}

module.exports.edit = (req ,res) => {
    res.render("admin/page/my-account/edit.pug",{
        titlepage: "Chỉnh Sửa Thông tin tài khoản"
    })
}
module.exports.editPatch = async (req ,res) => {
    console.log(req.body)
    // if(req.body.password){
    //     req.body.password = md5(req.body.password)
    // } else {
    //     delete req.body.password
    // }
    // const id = res.locals.user.id
    // await accounts.updateOne({_id: id}, req.body);
    // req.flash('info',"Cập Nhật Tài Khoản Thành Công")
    
    // console.log(req.body)
    // // chỗ này phải là /${prefix}/product
    // res.redirect("/admin/account")

}

