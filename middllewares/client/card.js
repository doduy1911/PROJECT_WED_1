const Card = require('../../models/card.model');

module.exports.cardId = async (req, res, next) => {
    // console.log('Request URL:', req.url);
    // console.log('Cookies:', req.cookies.cartId);
    // console.log(req.cookies.cardId);
    // const newCartId = generateNewCartId(); // Hàm generateNewCartId() làm nhiệm vụ tạo một cartId mới

    if (!req.cookies.cartId) {
        const card = new Card();
        await card.save();
        // console.log(card);
        const expiresTime = 1000 * 60 * 60 * 24 * 365  ;
        res.cookie("cartId", card.id,{
            expires: new  Date(Date.now() + expiresTime),
        }); // Corrected here
    } else{
         const cart = await Card.findOne({
            _id : req.cookies.cartId
         })

         cart.totalQuantity = cart.products.reduce((sum,item)=> sum + item.quantity,0)
        // 
        res.locals.minicart = cart;
    }
    // console.log(req.cookies.cartId)
    // res.cookie('cartId', newCartId, { maxAge: expiresTime, httpOnly: true });

    next();
};
