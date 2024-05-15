const buttonStatus = document.querySelectorAll("[button-status]");

// lấy status trong phần lọc
if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            if (status != "") {
                url.searchParams.set("status", status);
            }
            else {
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        })
    })
}

// form seach button

const formSearch = document.querySelector("#form-search");
if (formSearch) {
    let url = new URL(window.location.href)
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = e.target.elements.keyword.value

        if (value != "") {
            url.searchParams.set("keyword", value);

        } else {
            url.searchParams.delete("keyword");

        }
        window.location.href = url.href;


    })
}

// code phần phân trang (pagination)
const buttonPagination = document.querySelectorAll("[button-pagination")
// console.log(buttonPagination)
// kiểm tra xem có phần phân trang hay không 
if (buttonPagination.length > 0) {
    let url = new URL(window.location.href)

    buttonPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")
            // console.log(page)
            url.searchParams.set("page", page);
            window.location.href = url.href;
        })
    })
}

//change status
const buttonchangestatus = document.querySelectorAll("[button-change-status]")
if (buttonchangestatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status")
    const path = formChangeStatus.getAttribute("data-patch")
    // console.log(path)


    buttonchangestatus.forEach(button => {
        button.addEventListener("click", () => {
            const statuscurrent = button.getAttribute("data-status")
            const id = button.getAttribute("data-id")
            // console.log(statuscurrent)
            // console.log(id)
            const statuschange = statuscurrent == "active" ? "inactive" : "active";
            const action = path + `/${statuschange}/${id}?_method=PATCH`;

            formChangeStatus.action = action
            formChangeStatus.submit()


        })

    })
}

// end changre status

//checkbox-multi

const checkboxmulti = document.querySelector("[checkbox-multi]")
if (checkboxmulti) {
    const inputcheckall = checkboxmulti.querySelector("input[name='checkall']")
    const inputsid = checkboxmulti.querySelectorAll("input[name='id']")
    inputcheckall.addEventListener("click", () => {
        if (inputcheckall.checked) {
            inputsid.forEach(input => {
                input.checked = true;
            })
            // console.log(inputids)
        } else {
            inputsid.forEach(input => {
                input.checked = false;
            })
        }
    })
    inputsid.forEach(input => {
        input.addEventListener('click', () => {
            //đếm số lượng checkbox đã check vào 
            const conuntChecked = checkboxmulti.querySelectorAll("input[name='id']:checked").length

            if (conuntChecked == inputsid.length) {
                inputcheckall.checked = true
            } else {
                inputcheckall.checked = false
            }

        })
    })


}
// end checkbox-multifalse
// form change multi
const formchangemulti = document.querySelector("[form-change-multi]")
// console.log(formchangemulti)
formchangemulti.addEventListener("submit", (e) => {
    //hàm preventDefault ngăn chặn hành động mặc định (ở đây là ngăn chuyển trang khi submid form )
    e.preventDefault();
    // const checkboxmulti = document.querySelector("[checkbox-multi]")
    const inputschecked = checkboxmulti.querySelectorAll("input[name='id']:checked");
    // console.log(e.target.elements.type.value)
    const typeChange = e.target.elements.type.value
    if(typeChange =="delete-all"){

        const isCofirm = confirm("Bạn có chắc muốn xóa những sản phẩm này không ?")
        if(!isCofirm){
            return;
        }   
    }
    if(inputschecked.length>0){

        let ids = []
        const inputids = formchangemulti.querySelector("input[name='ids']")

        inputschecked.forEach(input=>{
            const id = input.value
            if(typeChange == "change-position"){
                //closet đi tìm các thẻ cha
                // console.log(input.closest("tr").querySelector("input[name='position']").value);
                const position = input.closest("tr").querySelector("input[name='position']").value

                ids.push(`${id}-${position}`);

            }else{
                ids.push(id)   

            }
                    
        })
        inputids.value=ids.join(",")
        // console.log(ids)
        formchangemulti.submit()
    }else{
        alert("vui lòng chọn ít nhất 1 bản ghi")
    }
   

})

// end form change multi

const buttondelete = document.querySelectorAll("[button-delete]")
if (buttondelete.length > 0) {
    const formdeleteitem = document.querySelector("#form-delete-item")
    const path = formdeleteitem.getAttribute("data-patch")
    // console.log(path)


    buttondelete.forEach(button => {
        button.addEventListener("click", () => {
            const confirmDelete=confirm("Bạn có chắc muốn xóa không ")

            if(confirmDelete) {
            const id = button.getAttribute("data-id")
           
            const action = path + `/${id}?_method=DELETE`;

            formdeleteitem.action = action
            formdeleteitem.submit()
            }


        })

    })
}

// show alert (thong báo thay đổi trạng thái thành công )
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
// end show alert

// button close alert

// end button close alert

// upload image
// Khai báo biến upload
// const uploadImage = document.querySelector('[upload-image]');

// // Sử dụng biến upload
// console.log(uploadImage);


  
//end upload image
