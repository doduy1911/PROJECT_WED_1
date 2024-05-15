// nhúng express
const express = require("express")
// nhúng env (có tác dụng là nhưng file có trong nó sẽ không bị đẩy nên github)
require("dotenv").config()
// cấu hình admin
const prefix = require("./config/system")
// nhúng flah thư viện hộ trợ thông báo
const flash = require('express-flash')
// nhúng cookie-parser do flash không có nên cần thêm vào
const cookieParser = require('cookie-parser')
// tương tự như parser
const session = require('express-session')


const app = express()


const port = 3000;
// nhúng method
var methodOverride = require('method-override')
// nhúng body parser
var bodyParser = require('body-parser')
// nhúng pug 
// dưới local
// app.set('views', './views')
// lên sever
app.set('views', `${__dirname}/views`)

app.set('view engine', 'pug')
// satrt flash
app.use(cookieParser('dodinhduythongbao'));
app.use(session({
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true
}));app.use(flash());
// end flash

//
// đè method
app.use(methodOverride('_method'))
//
app.use(bodyParser.urlencoded({ extended: false }))


// router home

const router = require('./router/client/index.router');
router(app)

const routeradmin = require('./router/admin/index.router');
routeradmin(app)




// dưới local
// app.use(express.static("public"))
// trên sevwe
app.use(express.static(`${__dirname}/public`))

app.locals.prefix = prefix.prefix_admin;

// // products
// check connection
const database = require("./config/database.js")
database.connect()

app.listen(port, () => {
    console.log(`lang nghe cong ${port}`)
})