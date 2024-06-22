const Order = require("../../models/order.model");

// [GET] /admin/orders
module.exports.order = async (req, res) => {
    const orders = await Order.find({
        deleted: false
    })

    res.render("admin/pages/orders/index", {
        title: "Danh sách đơn hàng",
        orders: orders
    });
}

// [PATCH] /admin/orders/change-status/:id/status
module.exports.changeStatus = async (req, res) => {
    const id = req.params.id;
    var status = "";
    switch (req.params.status) {
        case "pending":
            status = "Đang xử lý"
            break
        case "confirm":
            status = "Đã xác nhận"
            break
        case "shipping":
            status = "Đang giao"
            break
        case "success":
            status = "Thành công"
            break
        case "cancel":
            status = "Đã huỷ"
            break
    }

    await Order.updateOne(
        { _id: id },
        { status: status }
    )

    req.flash("success", `Đã cập nhật trạng thái đơn hàng thành công!`);

    res.redirect("back");
}