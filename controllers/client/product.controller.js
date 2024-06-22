const Product = require("../../models/product.model");
const ProductCategory = require("../../models/product-category.model");

const productsHelper = require("../../helpers/products");
const productsCategoryHelper = require("../../helpers/products-category");

// [GET] /products
module.exports.index = async (req, res) => {
    // Filter
    const listKeyType = [];
    const listKeyPrice = [];
    if (req.query.keyFilter) {
        const key = req.query.keyFilter.split("AND");

        if (key[0] != "") {
            const keyType = key[0].split("OR");
            keyType.forEach(item => {
                listKeyType.push({ product_category_id: `${item}` });
            });
        } else {
            listKeyType.push({ product_category_id: { $ne: "" } });
        }

        if (key[1] != "") {
            const keyPrice = key[1].split("OR");
            keyPrice.forEach(item => {
                const price = item.split("-");
                listKeyPrice.push({ $and: [{ priceDiscount: { $gte: `${+price[0]}` } }, { priceDiscount: { $lte: `${+price[1]}` } }] });
            });
        } else {
            listKeyPrice.push(
                { $and: [{ priceDiscount: { $gte: 0 } }, { priceDiscount: { $lte: 10000000 } }] }
            )
        }
    }

    const find = {
        status: "active",
        deleted: false
    }
    if (req.query.keyFilter) {
        find.$and = [
            { $or: listKeyType },
            { $or: listKeyPrice }
        ];
    }

    // Sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    const products = await Product.find(find).sort(sort);

    const newProducts = productsHelper.priceNewProducts(products);

    // Lay tat ca sub category
    const subs = await ProductCategory.find({
        parent_id: "",
        status: "active",
        deleted: false,
    });

    let allSub = [];

    for (const sub of subs) {
        const childs = await ProductCategory.find({
            parent_id: sub.id,
            status: "active",
            deleted: false,
        });

        allSub = allSub.concat(childs);
    }

    res.render("client/pages/products/index", {
        pageTitle: "SALE OUTLET - CHỈ ÁP DỤNG ONLINE",
        products: newProducts,
        allSub: allSub
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
    // sort
    let sort = {};

    if (req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false
    })


    const listSubCategory = await productsCategoryHelper.getSubCategory(category._id);

    const listSubCategoryId = listSubCategory.map(item => item.id);

    // Filter
    const listKeyType = [];
    const listKeyPrice = [];
    if (req.query.keyFilter) {
        const key = req.query.keyFilter.split("AND");

        if (key[0] != "") {
            const keyType = key[0].split("OR");
            keyType.forEach(item => {
                listKeyType.push({ product_category_id: `${item}` });
            });
        } else {
            listKeyType.push({ product_category_id: { $ne: "" } });
        }

        if (key[1] != "") {
            const keyPrice = key[1].split("OR");
            keyPrice.forEach(item => {
                const price = item.split("-");
                listKeyPrice.push({ $and: [{ priceDiscount: { $gte: `${+price[0]}` } }, { priceDiscount: { $lte: `${+price[1]}` } }] });
            });
        } else {
            listKeyPrice.push(
                { $and: [{ priceDiscount: { $gte: 0 } }, { priceDiscount: { $lte: 10000000 } }] }
            )
        }
    }

    const find = {
        product_category_id: { $in: [category.id, ...listSubCategoryId] },
        deleted: false
    }
    if (req.query.keyFilter) {
        find.$and = [
            { $or: listKeyType },
            { $or: listKeyPrice }
        ];
    }

    const products = await Product.find(find).sort(sort);

    const newProducts = productsHelper.priceNewProducts(products);


    res.render("client/pages/products/index", {
        pageTitle: category.title,
        products: newProducts,
        allSub: listSubCategory
    });
};