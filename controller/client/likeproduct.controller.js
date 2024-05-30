const Product = require('../../models/product.model')
const productHeper= require("../../helper/product.js")

module.exports.index = async (req ,res) => {

    const productFeatured = await Product.find({
        featured:"1",
        status:"active",
        deleted: false,

    })
    const newproductFeatured = productHeper.priceNewProduct(productFeatured)
    // console.log(newproductFeatured)
    
    

    // console.log(productFeatured)
    res.render("client/page/likeProduct/index",{
        titlepage: "Danh Sách Sản Phẩm Yêu Thích",
        productFeatured:newproductFeatured
    })
}