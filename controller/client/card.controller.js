const Cart = require("../../models/card.model")
const Product = require("../../models/product.model")
const productHepper = require("../../helper/product")
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
//   console.log(cartId)
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const cart = await Cart.findOne({
        _id: cartId
    })
    // console.log(cart)
    const exitsProductsIncart = cart.products.find(item => item.product_id === productId)
    // console.log(exitsProductsIncart)
    if (exitsProductsIncart) {
        // console.log("Cập nhật")
        const newQuantity = parseInt(quantity) + parseInt(exitsProductsIncart.quantity)   
        //    console.log(newQuantity)
           await Cart.updateOne({
            _id: cartId,
            'products.product_id':productId
           },{
             'products.$.quantity':newQuantity
           })
            
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity

        }
        await Cart.updateOne(
            {
                _id: cartId
            },
            {
                $push: { products: objectCart }
            }
        )
    }
    // console.log(quantity)
    // console.log(cartId)
    // console.log(productId)
    req.flash("info", "Thêm vào giỏ hàng thành công")
    res.redirect("back")

}
// controller trang hiện thị giỏ hàng
module.exports.index1 = async (req, res) => {
    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId
    })

    if(cart.products.length > 0) {
        for(const item of cart.products) {
            const productId = item.product_id
            // console.log(productId)
            const productInfo = await Product.findOne({
                _id : productId
            });
            productInfo.priceNew = parseFloat(((productInfo.price * (100 - productInfo.discountPercentage)) / 100).toFixed(0));

            // console.log(productInfo.priceNew)
            item.productInfo = productInfo 
            item.totlePrice = item.quantity *  productInfo.priceNew
        }
        
        cart.totlePrice = cart.products.reduce((sum,item) => sum + item.totlePrice,0)
    }

    // console.log(cart)
    res.render("client/page/cart/index",{
        titlepage : " Giỏ Hàng ",
        cartDetail:cart
    })
}