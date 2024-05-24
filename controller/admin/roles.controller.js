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