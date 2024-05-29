const homerouter = require("./home.router.js")
const categorymiddleware = require("../../middllewares/client/category.js")
const productsrouter = require("./product.router.js")


module.exports=(app)=>{
    app.use(categorymiddleware.category)
    app.get("/",homerouter)
    
    app.use("/product",productsrouter)

}