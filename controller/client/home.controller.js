const productscategory = require("../../models/product-category.model");
const producta = require("../../models/product.model");

module.exports.index = async (req, res) => {
    try {
        // Lấy danh mục sản phẩm và sản phẩm từ cơ sở dữ liệu
        const categories = await productscategory.find({ deleted: false });
        const products = await producta.find({ deleted: false, status: "active" });

        // Tạo object để lưu trữ sản phẩm theo từng danh mục
        const productsByCategory = {};
        categories.forEach(category => {
            productsByCategory[category._id] = products.filter(product => String(product.product_category_id) === String(category._id));
        });
        

        // Render view và truyền dữ liệu vào
        res.render('client/page/home/index.pug', {
            titlepage: "trang chủ",
            categories,
            productsByCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};
