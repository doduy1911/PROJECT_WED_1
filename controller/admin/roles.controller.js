const Rolse = require("../../models/rolse.model")
module.exports.index = async (req, res) => {
    const records = await Rolse.find({
        deleted: false
    })
    res.render("admin/page/roles/index.pug",{
        titlepage: " Phân Quyền",
        records:records

    })

}
module.exports.create = async (req, res) => {
  res.render("admin/page/roles/create.pug",{
    titlepage:"Tạo Mới Nhóm Quyền "
  })
}
module.exports.createPost = async (req, res) => {
    // console.log(req.body)
    
    const records = new Rolse(req.body);
    await records.save();
    req.flash("success","thêm Nhóm Quyền Thành công")
    res.redirect("/admin/roles")
  }

module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id
const roles = await Rolse.findOne({
    _id: id,
    deleted: false
})
// console.log(product)

res.render("admin/page/roles/edit.pug",{
  titlepage:"chỉnh sửa Nhóm Quyền ",
  roles:roles
})


    
} catch (error) {
    res.redirect(`/admin/roles`)
    
}}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id
  await Rolse.updateOne({_id: id}, req.body);
    req.flash('success',"CẬP NHẬT Quyền THÀNH CÔNG")
    
    // console.log(req.body)
    // chỗ này phải là /${prefix}/product
    res.redirect("/admin/roles")

}

module.exports.delete = async (req, res) => {
  const id = req.params.id
    await Rolse.deleteOne({_id: id})
    // console.log(id)
    res.redirect("back")
}



   