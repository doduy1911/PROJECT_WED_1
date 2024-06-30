// client_send_mess
// lấy ra form chat
const formSendData = document.querySelector(".chat .inner-form")
// console.log(formSendData)
// check xem form chat có tồn tại hay không 
if(formSendData){
    // bắt sự kiện submit của form 
    formSendData.addEventListener("submit",(e) =>{
        // dùng  preventDefault() để ngăn sự kiện mặc định của form ở đây là 
        // sự kiện submit của form để lấy ra data
        e.preventDefault();
        // lấy ra value của form đã submt lên 
        const content = e.target.elements.content.value
        // console.log(content)
        if(content){
            socket.emit("client_send_mess",content)
            e.target.elements.content.value = ""
        }
    })
}
//end  client_send_mess
// sever_return _mess
socket.on("server_return_mess",(data)=>{
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div")
    const myId = document.querySelector("[my-id]").getAttribute("my-id")
    let HtmlFullName = ""
    if(myId == data.userId){
        div.classList.add("inner-outgoing")
    }
    else 
    {
        div.classList.add("inner-incoming")
        HtmlFullName = `<div class="inner-name"> ${data.fullName} </div>`
        

    }
    div.innerHTML = (`
            ${HtmlFullName}
            <div class="inner-content"> ${data.content} </div>
        `
    )

        body.appendChild(div)
        bodyChat.scrollTop = bodyChat.scrollHeight;

})
// scroll chat 
const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end scrool chat
// nhúng icon vào đoạn chat
// document.querySelector('emoji-picker')
//   .addEventListener('emoji-click', event => console.log(event.detail));
const emojiPicker = document.querySelector("emoji-picker")
if(emojiPicker){
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    // console.log(inputChat)
    emojiPicker.addEventListener("emoji-click",(event)=>{
        const icon = event.detail.unicode;
        // console.log(icon)
        inputChat.value = inputChat.value + icon;
    })
}
//   end 