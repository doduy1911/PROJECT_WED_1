const dashboardrouter = require("./dashboard.router")
const productsrouter = require("./products.router")
const roles = require("./roles.router")
const account = require("./account.router")


const productCategorysrouter = require("./product-category.router")
const system_config = require("../../config/system")
module.exports=(app)=>{
    const PATH_ADMIN = "/" + system_config.prefix_admin
    app.use(PATH_ADMIN + "/dashboard",dashboardrouter)
    app.use(PATH_ADMIN + "/product",productsrouter)
    app.use(PATH_ADMIN + "/product_category",productCategorysrouter)
    app.use(PATH_ADMIN + "/roles",roles)
    app.use(PATH_ADMIN + "/account",account)



}