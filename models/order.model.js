const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        // user_id: String,
        cart_id: String,
        user_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String
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
        deletedAt: Date,
    },
    {
        timestamps: true,
    }
);
const Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
