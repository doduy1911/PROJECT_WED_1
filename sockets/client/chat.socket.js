const Chat = require("../../models/chat.model");
const uploadToCloudriany = require("../../helper/uploadCloudring.helper")
module.exports =  async (res) => {
    const userId = res.locals.user.id;
    const fullName = res.locals.user.fullName;
    _io.once("connection", (socket) => {
        // console.log("Một Người Dùng Đã Kết Nới  ",socket.id)

    socket.on("client_send_mess", async (data) => {
        // console.log(data.images)
        let images = [];
        for (const imagesBuffer of data.images) {
            const link = await uploadToCloudriany(imagesBuffer);
            images.push(link);
            
        }
            // console.log(userId)
            // console.log(content)
            // lưu vào data base
            const chat = new Chat({
                user_id: userId,
                content: data.content,
                images:images
            })

            await chat.save()

            //  trả về client
            _io.emit("server_return_mess", {
                userId: userId,
                fullName: fullName,
                content:data.content,
                images:images
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
  

}