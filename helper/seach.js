module.exports=(query)=>{
    let object_seach = {
        keyword:"",
        regex:""
    }
    if(query.keyword){
        object_seach.keyword = query.keyword
        const regex = new RegExp(object_seach.keyword,'i')
        // ta dùng thêm biến i để tìm không phân biệt chữ hoa chữ thường (chỉ cần tồn tại là đc)
        object_seach.regex = regex

        // console.log(regex)
    }

    return object_seach
}