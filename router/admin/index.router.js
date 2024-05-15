const dashboardrouter = require("./dashboard.router")
const productsrouter = require("./products.router")
const system_config = require("../../config/system")
module.exports=(app)=>{
    const PATH_ADMIN = "/" + system_config.prefix_admin
    app.use(PATH_ADMIN + "/dashboard",dashboardrouter)
    app.use(PATH_ADMIN + "/product",productsrouter)
}