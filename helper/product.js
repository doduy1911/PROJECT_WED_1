module.exports.priceNewProduct = (productFeatured) => {
    const newproductFeatured = productFeatured.map(item=>{
        item.priceNew= ((item.price * (100 - item.discountPercentage))/100).toFixed(0)
        return item
    }) 

    return newproductFeatured
}
module.exports.priceNewProducts = (productFeatured1) => {
    const priceNew = productFeatured1.map(item=>{
        item.priceNew= ((item.price * (100 - item.discountPercentage))/100).toFixed(0)
        return priceNew
    }) 

   
}