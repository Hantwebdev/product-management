const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products");

// [GET] / 
module.exports.index = async (req, res) => {
    // Lấy ra danh mục sản phẩm con
    const childCategorys = await ProductCategory.find({
        deleted: false,
        parent_id: { $ne: "" }
    }).select("id title thumbnail slug");

    // Lấy tổng sản phẩm trong mỗi danh mục con
    for (const item of childCategorys) {
        const totalItem = await Product.countDocuments({
            product_category_id: item.id,
            deleted: false,
        })
        item.totalProducts = totalItem;
    }


    // Lấy ra sản phẩm nối bật
    const productsFeatured = await Product.find({
        featured: "1",
        deleted: false,
        status: "active"
    })
    const newproductsFeatured = productsHelper.priceNewProducts(productsFeatured);

    // Lấy danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted: false,
        status: "active"
    }).sort({ position: "desc" }).limit(6);

    const newProductsNew = productsHelper.priceNewProducts(productsNew);

    res.render("client/pages/home/index", {
        pageTitle: "Trang chủ",
        productsFeatured: newproductsFeatured,
        newProducts: newProductsNew,
        childCategorys: childCategorys
    });
};
