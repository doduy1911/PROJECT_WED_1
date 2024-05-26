const dashboardrouter = require("./dashboard.router")
const productsrouter = require("./products.router")
const roles = require("./roles.router")
const account = require("./account.router")
const auth = require("./auth.router")
const authMiddleware = require("../../middllewares/admin/auth")


const productCategorysrouter = require("./product-category.router")
const system_config = require("../../config/system")
module.exports=(app)=>{
    const PATH_ADMIN = "/" + system_config.prefix_admin
    app.use(PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardrouter)
    app.use(PATH_ADMIN + "/product",authMiddleware.requireAuth,productsrouter)
    app.use(PATH_ADMIN + "/product_category",authMiddleware.requireAuth,productCategorysrouter)
    app.use(PATH_ADMIN + "/roles",authMiddleware.requireAuth,roles)
    app.use(PATH_ADMIN + "/account",authMiddleware.requireAuth,account)
    app.use(PATH_ADMIN + "/auth",auth)




}