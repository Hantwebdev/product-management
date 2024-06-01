const Cart = require("../../models/cart.model");
const Product = require("../../models/product.model");
const productsHelper = require("../../helpers/products");
module.exports.cartId = async (req, res, next) => {
    if (!req.cookies.cartId) {
        const cart = new Cart();
        await cart.save();

        const expriresCookie = 365 * 24 * 60 * 60 * 1000;
        res.cookie("cartId", cart.id, {
            expires: new Date(Date.now() + expriresCookie)
        });
    } else {
        const cart = await Cart.findOne({
            _id: req.cookies.cartId
        });

        // if (cart) 
        if (cart.products.length > 0) {
            for (const item of cart.products) {
                const productId = item.product_id;
                const productInfo = await Product.findOne({
                    _id: productId
                }).select("title thumbnail  slug  price discountPercentage");

                productInfo.priceNew = productsHelper.priceNewProduct(productInfo);

                item.productInfo = productInfo;

                // Tong tien tung san pham
                item.totalPrice = productInfo.priceNew * item.quantity;
            }

            cart.totalQuantity = cart.products.reduce((sum, item) => sum + item.quantity, 0)
        }

        // Tong tien ca don hang
        cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);

        // console.log(cart);

        res.locals.miniCart = cart;
    }
    next();
}