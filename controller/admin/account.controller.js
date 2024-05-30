const accounts = require('../../models/accounts.model')
const Rolse = require("../../models/rolse.model")
var md5 = require('md5');




module.exports.index = async (req ,res) =>{
    const records = await accounts.find({
        deleted: false,
    })

    for ( const record of records){
        const role = await Rolse.findOne({_id: record.role_id})
        record.role = role;
    }

    res.render("admin/page/accounts/index",{
        titlepage: "Danh Sách Tài Khoản",
        records: records


    })
}
module.exports.create =  async (req ,res) =>{
    const roles = await Rolse.find({
        deleted: false,
    })
    // console.log(roles)

    res.render("admin/page/accounts/create",{
        roles:roles,
        titlepage: "Tạo mới một tài khoản"
    })
}
module.exports.createPost = async (req ,res) =>{
    req.body.password = md5(req.body.password)
    // console.log(req.body)
    const records = new accounts(req.body)
    await records.save();
    res.redirect('/admin/account')
}

module.exports.edit =  async (req ,res) =>{
    const roles = await Rolse.find({
        deleted: false,
    })
    const id = req.params.id
    const data = await accounts.findOne({
        _id: id,
        deleted: false})
    // console.log(roles)

    res.render("admin/page/accounts/edit",{
        roles:roles,
        titlepage: "chỉnh sửa một tài khoản",
        data:data
    })
}
module.exports.editPost = async (req ,res) =>{
    if(req.body.password){
        req.body.password = md5(req.body.password)
    } else {
        delete req.body.password
    }
    const id = req.params.id
    await accounts.updateOne({_id: id}, req.body);
    req.flash('info',"Cập Nhật Tài Khoản Thành Công")
    
    // console.log(req.body)
    // chỗ này phải là /${prefix}/product
    res.redirect("/admin/account")

}

