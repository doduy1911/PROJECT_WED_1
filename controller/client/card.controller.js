const Cart = require("../../models/card.model")
module.exports.index = async (req, res) => {
    const cartId = req.cookies.cartId;
  console.log(cartId)
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const cart = await Cart.findOne({
        _id: cartId
    })
    console.log(cart)
    const exitsProductsIncart = cart.products.find(item => item.product_id === productId)
    console.log(exitsProductsIncart)
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
    console.log(quantity)
    console.log(cartId)
    console.log(productId)
    req.flash("info", "Thêm vào giỏ hàng thành công")
    res.redirect("back")

}