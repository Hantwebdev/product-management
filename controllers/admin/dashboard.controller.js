const ProductCategory = require("../../models/product-category.model");
const Product = require("../../models/product.model");
const Account = require("../../models/account.model");
const User = require("../../models/user.model");
const Order = require("../../models/order.model");
const moment = require('moment');
// [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
    const orders = await Order.find({ deleted: false });

    // Tổng doanh thu
    const totalRevenue = orders.reduce((sum, order) => {
        return sum += order.priceOrder
    }, 0);

    // Tổng đơn hàng
    const totalOrders = await Order.countDocuments({ deleted: false });

    // Tổng khách hàng
    const totalUsers = await User.countDocuments({ deleted: false });

    // Tổng sản phẩm
    const totalProducts = await Product.countDocuments({ deleted: false });

    // Tổng danh mục
    const totalCategorys = await ProductCategory.countDocuments({ deleted: false });

    const statistic = {
        revenue: totalRevenue,
        order: totalOrders,
        product: totalProducts,
        category: totalCategorys,
        user: totalUsers
    }

    // Thống kê doanh thu theo từng tháng
    const totalRevenueOfMonth = new Map();

    orders.map(order => {
        const createdAt = moment(order.createdAt).format("DD/MM/YYYY");
        const month = createdAt.slice(3, 5);
        if (!totalRevenueOfMonth.has(month)) {
            totalRevenueOfMonth.set(month, order.priceOrder);
        } else {
            const revenue = totalRevenueOfMonth.get(month);
            const newRevenue = revenue + order.priceOrder;
            totalRevenueOfMonth.set(month, newRevenue);
        }
    });

    const dataRevenueOfMonth = [];

    totalRevenueOfMonth.forEach((value, key) => {
        dataRevenueOfMonth.push(`${key}: ${value}`);
    })

    // Thống kê doanh thu theo từng tỉnh
    const totalRevenueOfProvince = new Map();

    orders.map(order => {
        const province = order.userInfo.province;
        if (!totalRevenueOfProvince.has(province)) {
            totalRevenueOfProvince.set(province, order.priceOrder);
        } else {
            const revenue = totalRevenueOfProvince.get(province);
            const newRevenue = revenue + order.priceOrder;
            totalRevenueOfProvince.set(province, newRevenue);
        }
    });

    const dataRevenueOfProvince = [];

    totalRevenueOfProvince.forEach((value, key) => {
        dataRevenueOfProvince.push(`${key}: ${value}`);
    })

    // Thống kê top 5 khách hàng thân thiết nhất
    const loyalCustomers = new Map();
    orders.map(order => {
        const userId = order.user_id;
        if (!loyalCustomers.has(userId)) {
            loyalCustomers.set(userId, 1);
        } else {
            const purchases = loyalCustomers.get(userId);
            const newPurchases = purchases + 1;
            loyalCustomers.set(userId, newPurchases);
        }
    });

    const loyalCustomersSort = new Map([...loyalCustomers.entries()].sort((a, b) => b[1] - a[1]));

    const dataloyalCustomers = [];

    var cntCustomers = 1;

    for (const [key, value] of loyalCustomersSort) {
        if (cntCustomers <= 5) {
            try {
                const customer = await User.findOne({
                    _id: key,
                    deleted: false
                });
                if (customer) {
                    dataloyalCustomers.push(
                        {
                            fullName: customer.fullName,
                            avatar: customer.avatar,
                            phone: customer.info.phone,
                            address: customer.info.address,
                            province: customer.info.province,
                            purchases: value
                        }
                    );
                    cntCustomers += 1;
                }
            } catch (error) {
                console.error(`Error fetching customer with ID ${key}:`, error);
            }
        } else {
            break;
        }
    }

    // Thống kê đơn hàng theo tháng
    const totalOrderOfMonth = new Map();

    orders.map(order => {
        const createdAt = moment(order.createdAt).format("DD/MM/YYYY");
        const month = createdAt.slice(3, 5);
        if (!totalOrderOfMonth.has(month)) {
            totalOrderOfMonth.set(month, 1);
        } else {
            const value = totalOrderOfMonth.get(month);
            const newValue = value + 1;
            totalOrderOfMonth.set(month, newValue);
        }
    });

    const dataOrderOfMonth = [];

    totalOrderOfMonth.forEach((value, key) => {
        dataOrderOfMonth.push(`${key}: ${value}`);
    })

    // Top đơn hàng mới nhất
    const listNewestOrder = await Order.find({ deleted: false }).sort({ createdAt: -1 }).limit(5);

    // Thống kê lượt bán ra theo sản phẩm + Thống kê số lượng tồn kho
    const productsSold = new Map();
    orders.map(order => {
        order.products.forEach(item => {
            const product = item.name;
            if (!productsSold.has(product)) {
                productsSold.set(product, item.quantity);
            } else {
                const quantity = productsSold.get(product);
                const newQuantity = quantity + item.quantity;
                productsSold.set(product, newQuantity);
            }
        })
    });
    const dataProductsSold = [];

    productsSold.forEach((value, key) => {
        dataProductsSold.push(`${key}: ${value}`);
    })

    // Thống kê số lượng tồn kho
    const dataProductsInventory = [];

    for (const [key, value] of productsSold) {
        try {
            const product = await Product.findOne({
                title: key,
                deleted: false
            });
            if (product) {
                dataProductsInventory.push(`${key}: ${product.stock - value}`);
            }
        } catch (error) {
            console.error(`Error fetching customer with ID ${key}:`, error);
        }
    }

    // Thống kê theo số lượng loại sản phẩm
    // -----Lấy ra danh mục sản phẩm con
    const childCategorys = await ProductCategory.find({
        deleted: false,
        parent_id: { $ne: "" }
    }).select("id title thumbnail slug");

    // -----Lấy tổng sản phẩm trong mỗi danh mục con
    for (const item of childCategorys) {
        const totalItem = await Product.countDocuments({
            product_category_id: item.id,
            deleted: false,
        })
        item.totalProducts = totalItem;
    }

    const totleTypeProduct = [];
    childCategorys.forEach(item => {
        totleTypeProduct.push(`${item.title}: ${item.totalProducts}`)
    })

    //  Thống kê theo trạng thái đơn hàng
    const statusOrder = new Map();

    orders.map(order => {
        const status = order.status;
        if (!statusOrder.has(status)) {
            statusOrder.set(status, 1);
        } else {
            const value = statusOrder.get(status);
            const newValue = value + 1;
            statusOrder.set(status, newValue);
        }
    });

    const dataStatusOrder = [];

    statusOrder.forEach((value, key) => {
        dataStatusOrder.push(`${key}: ${value}`);
    })


    res.render("admin/pages/dashboard/index", {
        pageTitle: "Trang tổng quan",
        statistic: statistic,
        dataRevenueOfMonth: JSON.stringify(dataRevenueOfMonth),
        dataloyalCustomers: dataloyalCustomers,
        dataOrderOfMonth: JSON.stringify(dataOrderOfMonth),
        listNewestOrder: listNewestOrder,
        dataRevenueOfProvince: dataRevenueOfProvince,
        dataProductsSold: dataProductsSold,
        dataProductsInventory: dataProductsInventory,
        totleTypeProduct: totleTypeProduct,
        dataStatusOrder: dataStatusOrder
    });
};
