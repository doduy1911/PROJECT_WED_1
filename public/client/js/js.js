const showAlert = document.querySelector('[show-alert]')
// console.log(showAlert)
if(showAlert){
    const time = parseInt(showAlert.getAttribute('data-time'))||3000;
    const closeAlert = document.querySelector('[close-alert]')
    setTimeout(() =>{
        showAlert.classList.add("alert-hidden")

    },time)
    closeAlert.addEventListener("click",() =>{
        showAlert.classList.add("alert-hidden")
    })
    // console.log(time)
}