// client_send_mess
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
// lấy ra form chat
const formSendData = document.querySelector(".chat .inner-form")
// console.log(formSendData)
// check xem form chat có tồn tại hay không 
if (formSendData) {
    // bắt sự kiện submit của form 
    formSendData.addEventListener("submit", (e) => {
        // dùng  preventDefault() để ngăn sự kiện mặc định của form ở đây là 
        // sự kiện submit của form để lấy ra data
        e.preventDefault();
        // lấy ra value của form đã submt lên 
        const content = e.target.elements.content.value
        // console.log(content)
        if (content) {
            socket.emit("client_send_mess", content)
            e.target.elements.content.value = ""
            socket.emit("CLIENT_SEND_TYPING","hidden");

        }
    })
}
//end  client_send_mess
// sever_return _mess
socket.on("server_return_mess", (data) => {
    const body = document.querySelector(".chat .inner-body");
    const div = document.createElement("div")
    const myId = document.querySelector("[my-id]").getAttribute("my-id")
    const boxtyping = document.querySelector(".inner-list -typing")
    let HtmlFullName = ""
    if (myId == data.userId) {
        div.classList.add("inner-outgoing")
    }
    else {
        div.classList.add("inner-incoming")
        HtmlFullName = `<div class="inner-name"> ${data.fullName} </div>`


    }
    div.innerHTML = (`
            ${HtmlFullName}
            <div class="inner-content"> ${data.content} </div>
        `
    )

    body.insertBefore(div,boxtyping)
    bodyChat.scrollTop = bodyChat.scrollHeight;

})
// scroll chat 
const bodyChat = document.querySelector(".chat .inner-body")
if (bodyChat) {
    bodyChat.scrollTop = bodyChat.scrollHeight;
}
// end scrool chat
// nhúng icon vào đoạn chat
// document.querySelector('emoji-picker')
//   .addEventListener('emoji-click', event => console.log(event.detail));
const emojiPicker = document.querySelector("emoji-picker")
// show typing 
    var timeOut;
    const showtyping = ()=>{
        socket.emit("CLIENT_SEND_TYPING","show");
        clearTimeout(timeOut)
       timeOut =  setTimeout(() => {
            socket.emit("CLIENT_SEND_TYPING","hidden");
        },3000)
    }
// end showtyping
// ẩn hiện icon
const buttonIcon = document.querySelector(".button-icon")
if (buttonIcon) {
    const toolTip = document.querySelector(".tooltip");
    // console.log(toolTip)
    Popper.createPopper(buttonIcon, toolTip)

    buttonIcon.onclick = () => {
        toolTip.classList.toggle('shown')
    }


}
//  end ẩn hiện icon
//  inrsrt icon
var timeOut ;

if (emojiPicker) {
    const inputChat = document.querySelector(".chat .inner-form input[name='content']");
    // console.log(inputChat)
    emojiPicker.addEventListener("emoji-click", (event) => {
        const icon = event.detail.unicode;
        // console.log(icon)
        inputChat.value = inputChat.value + icon;
        const end = inputChat.value.length;
        inputChat.setSelectionRange(end,end)
        inputChat.focus();
        showtyping();
    });

    var timeOut ;

    inputChat.addEventListener("keyup",()=>{
        showtyping();
    })
}
const elementsListTyping = document.querySelector(".chat .inner-list-typing") 
if(elementsListTyping){


// SERVER_RETURN_TYPING
socket.on("SERVER_RETURN_TYPING",(data)=>{
    if(data.type == "show"){
    const exitsTyping = elementsListTyping.querySelector(`[user-id = "${data.userId}"]`)
    // console.log(data)
  if(!exitsTyping){
    const boxTyping = document.createElement("div")
    boxTyping.classList.add("box-typing")
    boxTyping.setAttribute("user-id",data.userId)
    boxTyping.innerHTML=
    `<div class="box-typing">
        <div class="inner-name ">${data.fullName}</div>
            <div class="inner-dots">
                <span> </span>
                <span> </span>
                <span> </span>
    </div>
</div>

    `;
    elementsListTyping.appendChild(boxTyping)}
    bodyChat.scrollTop = bodyChat.scrollHeight;

}else{
    const boxtypingRemove = elementsListTyping.querySelector(`[user-id="${data.userId}"]`)
    if(boxtypingRemove){
        elementsListTyping.removeChild(boxtypingRemove)
    }
}
})


}
// SERVER_RETURN_TYPING
//   end 

// `
// <div class="box-typing">
//     <div class="inner-name ">Đỗ Đình DUy</div>
//         <div class="inner-dots">
//             <span> </span>
//             <span> </span>
//             <span> </span>
//     </div>
// </div>
// `