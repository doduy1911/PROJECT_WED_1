// const productscategory = require("../../models/product-category.model")
// const createTree = require("../../helper/createTree")
module.exports.index= async (req, res) => {
    // const categoryProduct = await productscategory.find({
    //     deleted:false
    // })
    // // console.log(categoryProduct)
    // const newcategogyProduct = createTree(categoryProduct)
    res.render('client/page/home/index.pug', {
        titlepage: "trang chủ",
        // layoutCategoryProduct:newcategogyProduct
    });
}