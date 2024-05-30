const homerouter = require("./home.router.js")
const categorymiddleware = require("../../middllewares/client/category.js")
const productsrouter = require("./product.router.js")
const likeProduct = require("./likeProduct.router.js")
const search = require("./search.router.js")

module.exports=(app)=>{
    app.use(categorymiddleware.category)
    app.get("/",homerouter)
    
    app.use("/product",productsrouter)
    app.use("/likeProduct",likeProduct)
    app.use("/likeProduct",likeProduct)
    app.use("/search",search)



}