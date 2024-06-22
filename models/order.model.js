const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        cart_id: String,
        user_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String,
            province: String,
        },
        products: [
            {
                product_id: String,
                name: String,
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ],
        priceOrder: Number,
        deleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            default: "Đang xử lý"
        },
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
