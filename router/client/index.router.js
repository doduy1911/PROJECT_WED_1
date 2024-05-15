const homerouter = require("./home.router.js")

const productsrouter = require("./product.router.js")


module.exports=(app)=>{
    app.get("/",homerouter)
    
    app.use("/product",productsrouter)

}