const Product = require("../../models/product.model")
const productHeper = require("../../models/product.model")
module.exports.index =  async(req , res ) => {

    const keyword = req.query.keyword

        const keywordRegex = new RegExp(keyword,"i")
        const products = await Product.find({
            status : "active",
            title : keywordRegex,
            deleted : false

        })
        // console.log(products)
        // newProduct = productHeper.priceNewProducts(products)
        // console.log(newProduct)
    
    // console.log(keyword)
    res.render("client/page/search/index",{
        titlepage: "Kết QuảTìm Kiếm",
        keyword : keyword,
        products:products
    })
}