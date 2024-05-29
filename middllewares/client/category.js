const productscategory = require("../../models/product-category.model")
const createTree = require("../../helper/createTree")
module.exports.category = async (req,res,next) =>{
    // console.log("oke")
    const categoryProduct = await productscategory.find({
        deleted:false
    })
    // console.log(categoryProduct)
    const newcategogyProduct = createTree(categoryProduct)
    res.locals.layoutCategoryProduct = newcategogyProduct
    next()

}