const Cart = require("../../models/card.model")
const Product = require("../../models/product.model")
const productHepper = require("../../helper/product")
const Order = require("../../models/order.model")
module.exports.index= async (req,res) => {
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

    res.render("client/page/checkout/index.pug",{
        titlepage:"Đặt Hàng",
        cartDetail:cart
    })
}

module.exports.orderPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo =req.body
    const cart = await Cart.findOne({
        _id: cartId

    })

    let products = []
    for (const product of cart.products) {
        const objectProduct = {
            product_id:product.product_id,
            price:0,
            quantity:product.quantity,
            discountPercentage:0
        };
        const productInfo = await Product.findOne({
            _id:product.product_id
        });
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;
        products.push(objectProduct)
    };

    const objectOrder = {
        cart_id:cartId,
        userInfo:userInfo,
        products:products
    }
    const order = new Order(objectOrder)
    await order.save()
    await Cart.updateOne({
        _id: cartId,
    },{
        products:[]
    })

    //  console.log(order)
 
    res.redirect(`/checkout/success/${order.id}`)
}


module.exports.success = async (req,res) => {
    // console.log(req.params.id)

    const order = await Order.findOne({
        _id: req.params.id}
    )

    for(const product of order.products) {
        const productInfo = await Product.findOne({
            _id: product.product_id
        }).select("title thumbnail")
        product.productInfo = productInfo
        product.priceNew = parseFloat(((product.price * (100 - product.discountPercentage)) / 100).toFixed(0));
        product.totalPrice = product.priceNew * product.quantity 
        // console.log(product.productInfo)
        // console.log(product.productInfo.thumbnail)
    }
    order.totlePrice = order.products.reduce((sum,item) => sum + item.totalPrice,0)

// console.log(order)
    res.render("client/page/checkout/success",{
        titlepage:"Đặt Hàng Thành Công",
        order:order
    })
}