const homerouter = require("./home.router.js")
const categorymiddleware = require("../../middllewares/client/category.js")
const productsrouter = require("./product.router.js")
const likeProduct = require("./likeProduct.router.js")
const search = require("./search.router.js")
const cardMiddleware = require("../../middllewares/client/card.js")
const cardrouter = require("./cart.router.js")
const checkout = require("./checkout.router.js")
const user = require("./user.router.js")
const userMiddleware = require("../../middllewares/client/user.js")
const chat  = require("./chat.router.js")



module.exports=(app)=>{
    app.use(categorymiddleware.category)
    app.use(cardMiddleware.cardId)
    app.use(userMiddleware.infoUser)
    app.get("/",homerouter)
    app.use("/cart",cardrouter)
    app.use("/product",productsrouter)
    app.use("/likeProduct",likeProduct)
    app.use("/search",search)
    app.use("/checkout",checkout)
    app.use("/user",user)
    app.use("/chat",chat)






}