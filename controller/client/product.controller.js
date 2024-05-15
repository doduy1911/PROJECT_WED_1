const Product = require("../../models/product.model")
module.exports.index= async(req, res) => {
    const products = await Product.find({
        status:"active",
        deleted: false,

    }).sort({position: "desc"});
        
        // console.log(products)
        const newproduct = products.map(item=>{
            item.priceNew= ((item.price * (100 - item.discountPercentage))/100).toFixed(0)
            return item
        })

        // console.log(newproduct)
    res.render('client/page/products/index.pug', {
        titlepage: "Danh Sách Sản Phẩm ",
        products: newproduct
    });
}
module.exports.detail= async(req, res) => {
   
    try {
        const slug = req.params.slug
        const product = await Product.findOne({
            slug: slug,
            deleted: false,
            status: "active"
        })
        
        res.render('client/page/products/detail.pug', {
            titlepage: "chi tiết  Sản Phẩm ",
            product: product
        });
    } catch (error) {
        
        res.redirect("/")
    }
}

