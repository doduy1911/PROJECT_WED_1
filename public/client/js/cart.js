// cập  nhật số lượng trong giỏ hàng
const inputQuantity = document.querySelectorAll("input[name='quantity']")
// console.log(inputQuantity)
if(inputQuantity.length > 0 ){
    inputQuantity.forEach(input => {
        // console.log(input)
        input.addEventListener("change",(e)=>{
            // console.log(e.target.value)
            const productId = input.getAttribute("product-id")
            const quantity = parseInt(input.value)
            if(quantity > 0) {
                window.location.href = `/cart/update/${productId}/${quantity}`
            }
        })
    })

}
// end cập nhấp số lượng trong giỏ hàng
