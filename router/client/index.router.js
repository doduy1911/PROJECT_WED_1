const homerouter = require("./home.router.js")
const categorymiddleware = require("../../middllewares/client/category.js")
const productsrouter = require("./product.router.js")
const likeProduct = require("./likeProduct.router.js")
const search = require("./search.router.js")
const cardMiddleware = require("../../middllewares/client/card.js")
const cardrouter = require("./cart.router.js")

module.exports=(app)=>{
    app.use(categorymiddleware.category)
    app.use(cardMiddleware.cardId)
    app.get("/",homerouter)
    app.use("/cart",cardrouter)
    app.use("/product",productsrouter)
    app.use("/likeProduct",likeProduct)
    app.use("/search",search)



}