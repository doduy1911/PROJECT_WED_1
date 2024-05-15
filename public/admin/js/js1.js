const uploadImage = document.querySelector('[upload-image]');

// Sử dụng biến upload
console.log(uploadImage);
if(uploadImage){
    const uploadImageInput = document.querySelector('[upload-image-input]');
    const uploadImagePreview = document.querySelector('[upload-image-preview]');
    // console.log(uploadImageInput)
    // console.log(uploadImagePreview)
    uploadImageInput.addEventListener("change", (e) =>{
        const image = URL.createObjectURL(e.target.files[0]);
        uploadImagePreview.src=image
    })
    

    


}