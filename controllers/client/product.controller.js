const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false,
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: newProducts,
    });
};

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
    try {
        //- Lấy thông tin chi tiết sản phẩm
        const find = {
            deleted: false,
            slug: req.params.slugProduct,
            status: "active"
        }

        const product = await Product.findOne(find);


        // Lấy ra danh mục cha của sản phẩm
        const category = await ProductCategory.findOne({
            _id: product.product_category_id,
            deleted: false,
            status: "active"
        });

        product.category = category;

        product.priceNew = productsHelper.priceNewProduct(product);

        // Tìm tất cả sản phẩm cùng phân khúc
        const productSegment = await Product.find({
            $and: [
                { price: { $lte: product.price + 100 } },
                { price: { $gte: product.price - 100 } }
            ],
            _id: { $ne: product.id },
            deleted: false,
            status: "active"
        })

        for (const item of productSegment) {
            item.priceNew = productsHelper.priceNewProduct(item);
        }

        // Tìm tất cả sản phẩm trong cùng danh mục cha (không bao gồm sản phẩm hiện tại) - sản phẩm cùng loại
        const listChildProduct = await Product.find({
            product_category_id: category.id,
            _id: { $ne: product.id },
            deleted: false,
            status: "active"
        })

        for (const item of listChildProduct) {
            item.priceNew = productsHelper.priceNewProduct(item);
        }

        res.render("client/pages/products/detail", {
            pageTitle: product.title,
            product: product,
            listChildProduct: listChildProduct,
            productSegment: productSegment
        });
    } catch (error) {
        res.redirect(`/products`);
        console.log(error)
    }
};

// [GET] /products/:slugCategory
module.exports.category = async (req, res) => {

    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false
    })

    const listSubCategory = await productsCategoryHelper.getSubCategory(category.id);

    const listSubCategoryId = listSubCategory.map(item => item.id);

    const products = await Product.find({
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false
    }).sort({ position: "desc" });

    const newProducts = productsHelper.priceNewProducts(products);

    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts,
    });
};