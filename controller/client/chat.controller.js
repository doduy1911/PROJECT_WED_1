const { Socket } = require("socket.io");
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
module.exports.index = async (req, res) => {
    // lấy ra userID
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // console.log(userId)
    // SocketIo
    _io.once("connection", (socket) => {
        // console.log("Một Người Dùng Đã Kết Nới  ",socket.id)

    socket.on("client_send_mess", async (content) => {
            // console.log(userId)
            // console.log(content)
            // lưu vào data base
            const chat = new Chat({
                user_id: userId,
                content: content
            })

            await chat.save()

            //  trả về client
            _io.emit("server_return_mess", {
                userId: userId,
                fullName: fullName,
                content: content
            });

        });

    socket.on("CLIENT_SEND_TYPING",(type)=>{
        // console.log(type)
        socket.broadcast.emit("SERVER_RETURN_TYPING",{
            userId: userId,
            fullName: fullName,
            type: type

        })
    })
    });
    // find thì lấy ra array
    // findOne thì lấy ra object
    const chats = await Chat.find({
        deleted: false,
    });
    // console.log(chat)
    // socketIo
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id: chat.user_id
        }).select("fullName")

        chat.infoUser = infoUser
    }
    // const chatsArray =  chats.map(item => item.content)
    // console.log(chats)
    // res.render là gọi dến phần view cần hiện thị ra 
    res.render("client/page/chat/index.pug", {
        titlepage: "Chat",
        chats: chats

    })

}