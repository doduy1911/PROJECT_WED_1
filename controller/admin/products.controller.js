const Product = require("../../models/product.model")
const Product1 = require("../../models/product-category.model")

const filterstatusHepers = require("../../helper/filterStatus")
const seach = require("../../helper/seach")
const paginationHepers = require("../../helper/pagination")
const { response } = require("express")
const createTree = require("../../helper/createTree")
const accounts = require("../../models/accounts.model")

//[get] /admin/products
module.exports.index = async (req, res) => {
    const filterstatus = filterstatusHepers(req.query)
    const object_seach = seach(req.query)

    let find = {
        deleted: false,
    }
    if (req.query.status) {
        find.status = req.query.status
    }
// tìm kiếm gần đúng ta dùng regExp
    if (req.query.keyword) {
        // ta dùng thêm biến i để tìm không phân biệt chữ hoa chữ thường (chỉ cần tồn tại là đc)
        find.title = object_seach.regex
    }
    // phân trang 
    let initobjectPagination  = {
        currentPage: 1 ,
        limitItems: 4

     }
    const countPagination = await Product.count(find)
    const objectPagination = paginationHepers(req.query,countPagination,initobjectPagination)
//  kết thúc phần phân trang 
// sort sắp xếp theo tiêu chí
let sort = {

};
if(req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue
}else{
    sort.position = "desc"

}
// console.log(sort)
// xóa sắp xếp thoe tiêu chí
// end sắp xếp theo tiêu chí
// end sort
    const products = await Product.find(find)
    // asc là tăng dần desc là tăng dần
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip)

    for(const product of products) {
        const user = await accounts.findOne({
            _id : product.createdBy.account_Id
        });
        // console.log(user)
        if(user){
                    product.createdBy.accountsfullName = user.fullname


        }

    }
    res.render("admin/page/products/index", {
        titlepage: "Danh sách sản phẩm",
        products: products,
        filterstatus: filterstatus,
        keyword: object_seach.keyword,
        pagination:objectPagination
    });
}

//[  ] /admin/products/chang-status/:id  thay đổi trạng thái từng sản phẩm 
module.exports.changeStatus = async (req,res) => {
    // console.log("changeStatus")
    const status = req.params.status
    const id = req.params.id
      
     await Product.updateOne({_id: id},{status: status})
     req.flash('info', 'Cập Nhật Trạng Thái Thành Công !');

    res.redirect('back')
} 
//[  ] /admin/products/chang-multi/:id  thay đổi trạng thái nhiều sản phẩm 
module.exports.changeMulti = async (req,res) => {
    const type = req.body.type
    const ids = req.body.ids.split(',')
    switch (type){
        case "active":
            await Product.updateMany({_id:{$in:ids}},{status:type})
            req.flash("info", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);

            break;
        case "inactive":
            await Product.updateMany({_id:{$in:ids}},{status:type})
            req.flash("info", `Cập nhật trạng thái thành công ${ids.length} sản phẩm!`);
            break;
        case "delete-all":
            //nếu muốn xóa cứng thì đổi updatemany thành deletevalue
            await Product.deleteMany({_id:{$in:ids}},{
                deleted:true,
                // deletedAt: new Date()
                deleteBy: {
                    account_Id : res.locals.user.id,
                    deleteAt: new Date(),
                      
                }
            })
            req.flash("info", `xóa  thành công ${ids.length} sản phẩm!`);


            break;
        case "change-position":

            for(const item of ids){
                // console.log(item.split("-"))
                const [id, position] = item.split("-")
                await Product.updateOne({_id:id},{position:position});
                req.flash("info", `thay đổi vị trí thành công `);

            }
            break;
        default:
            break;
    }
    res.redirect("back");
    //hàm split chuyển 1 chuỗi thành 1 mảng 
}
//[  DELETE] /admin/products/delete

//xóa cứng (xóa là hết)
module.exports.deleteItem = async (req,res) => {
    const id = req.params.id
    await Product.deleteOne({_id: id})
    console.log(id)
    res.redirect("back")
}
//[  DELETE] /admin/products/delete

//xóa Mềm (xóa nhưng vẫn có trong CSDL)
// module.exports.deleteItem = async (req,res) => {
//     const id = req.params.id
//     await Product.updateOne({_id: id},{
//         deleted:true,
//         deletedAt: new Date()
//         // deleteBy: {
//         //     account_Id : res.locals.user.id,
//         //     deleteAt: new Date(),
              
//         // }
//     })
//     req.flash("info", `xóa thành công sản phẩm!`);
//     console.log(res.locals.user.id)

    
//     // console.log(id)
//     res.redirect("back")
// }

module.exports.create = async (req,res) => {
    let find = {
        deleted: false,
    } 
    
    const products = await Product1.find(find)
    
    const newrecord = createTree(products)
    res.render("admin/page/products/create",{
        titlepage: "Tạo Mới Một Sản Phẩm",
        products:newrecord

    })
    
}

module.exports.createPost = async (req,res) => {
    // console.log(res.locals.role)
    console.log(res.locals.user.id)


    
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)

    if(req.body.position ===""){
        const countProducts = await Product.countDocuments()
        req.body.position= countProducts + 1
        // console.log(countProducts)

    }else{
        req.body.position=parseInt(req.body.position)
    }
    req.body.createdBy = {
        account_Id:res.locals.user.id
    };

    // if(req.file && req.file.filename) {
    //     req.body.thumbnail= `/uploads/${req.file.filename}`;
    // }
    // console.log(req.body)
    

    const product = new Product(req.body)
    await product.save();
    
    // console.log(req.body)
    // chỗ này phải là /${prefix}/product nhưng thôi fix sau vì đang lười vc
    res.redirect("/admin/product")
    // cần làm phát triển thêm phần thông báo là đã thêm thành công nhưng do lười nên thôi

}


module.exports.edit = async (req,res) => {
    try {
        const id = req.params.id
    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    // console.log(product)

    res.render("admin/page/products/edit",{
        titlepage: "chỉnh sửa Một Sản Phẩm",
        product: product
    })
    
        
    } catch (error) {
        res.redirect(`/admin/product`)
        
    }
}

module.exports.editPatch = async (req,res) => {
    const id = req.params.id
    req.body.price = parseInt(req.body.price)
    req.body.discountPercentage = parseInt(req.body.discountPercentage)
    req.body.stock = parseInt(req.body.stock)
    req.body.position=parseInt(req.body.position)
    // if(req.file && req.file.filename) {
    //     req.body.thumbnail= `/uploads/${req.file.filename}`;
    // }
    
    await Product.updateOne({_id: id}, req.body);
    req.flash('success',"CẬP NHẬT SẢN PHẨM THÀNH CÔNG")
    
    // console.log(req.body)
    // chỗ này phải là /${prefix}/product
    res.redirect("/admin/product")
    // cần làm phát triển thêm phần thông báo là đã thêm thành công 

}

module.exports.detail = async (req,res) => {
    
    try {
        const id = req.params.id
    const product = await Product.findOne({
        _id: id,
        deleted: false
    })
    // console.log(product)

    res.render("admin/page/products/detail",{
        titlepage: "chi tiết Sản Phẩm",
        product: product
    })
        
    } catch (error) {
        res.redirect(`/admin/product`)
        
    }
    
}


