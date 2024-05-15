module.exports = (query,countPagination,objectPagination) =>{
  
    //  console.log(req.query.page)

     if (query.page) {
         objectPagination.currentPage = parseInt(query.page)
     }

     objectPagination.skip = (objectPagination.currentPage  - 1) * objectPagination.limitItems
    //  tính tổng số lượng bản ghi
     
    //  console.log(countPagination)
    // tính tổng số trang 
    objectPagination.totalpages = Math.ceil(countPagination  / objectPagination.limitItems)
    
    return objectPagination

}