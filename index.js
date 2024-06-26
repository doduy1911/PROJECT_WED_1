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
// định dạng ngày tháng cho dữ liệu
const moment = require('moment')
const accounts = require('./models/accounts.model')
const Role = require('./models/rolse.model')
// md5 mã Hóa mật Khẩu
const md5 = require('md5');
// nhúng thêm thư viện http để tạp ra server gửi tin nhắn 
const http = require("http")
// nhúng socket.io vào 
const { Server } = require("socket.io");






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
// socket.io
const server = http.createServer(app);
const io = new Server(server);
global._io = io;
// bắt sự kiện kết nối thành công cho socket
  

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
app.locals.moment= moment
app.locals.user= accounts
app.locals.role=Role
app.locals.md5=md5



// // products
// check connection
const database = require("./config/database.js")
database.connect()

server.listen(port, () => {
    console.log(`lang nghe cong ${port}`)
})