const { Socket } = require("socket.io");
const Chat = require("../../models/chat.model");
const User = require("../../models/user.model");
const uploadToCloudriany = require("../../helper/uploadCloudring.helper")

const chatSocket = require("../../sockets/client/chat.socket")
module.exports.index = async (req, res) => {
    // lấy ra userID
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;

    // console.log(userId)
    // SocketIo
   chatSocket(res)
    // console.log(chat)
    // socketIo
    const chats = await Chat.find({
        deleted: false,
    });
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