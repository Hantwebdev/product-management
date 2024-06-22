const md5 = require("md5");
const User = require("../../models/user.model");
const ForgotPassword = require("../../models/forgot-password.model");
const Cart = require("../../models/cart.model");
const Order = require("../../models/order.model")

const generateHelper = require("../../helpers/generate");
const sendMailHelper = require("../../helpers/sendMail");

// [GET] /user/register
module.exports.register = async (req, res) => {
    res.render("client/pages/user/register", {
        pageTitle: "Đăng kí tài khoản",
    });
};

// [POST] /user/register
module.exports.registerPost = async (req, res) => {
    const existEmail = await User.findOne({
        email: req.body.email
    });

    if (existEmail) {
        req.flash("error", "Email đã tồn tại!");
        res.redirect("back");
        return
    }

    req.body.password = md5(req.body.password);


    const user = new User(req.body);

    user.tokenUser = generateHelper.generateRandomString(20);

    await user.save();

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/");
};

// [GET] /user/login
module.exports.login = async (req, res) => {
    res.render("client/pages/user/login", {
        pageTitle: "Đăng nhập tài khoản",
    });
};

// [POST] /user/login
module.exports.loginPost = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({
        email: email,
        deleted: false
    })

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return
    }

    if (md5(password) !== user.password) {
        req.flash("error", "Sai mật khẩu!");
        res.redirect("back");
        return
    }

    if (user.status === "inactive") {
        req.flash("error", "Tài khoản đang bị khoá!");
        res.redirect("back");
        return
    }

    const cart = await Cart.findOne({
        user_id: user.id
    });

    if (cart) {
        res.cookie("cartId", cart.id);
    } else {
        await Cart.updateOne({
            _id: req.cookies.cartId
        }, {
            user_id: user.id
        });
    }


    res.cookie("tokenUser", user.tokenUser);

    await User.updateOne({
        tokenUser: user.tokenUser
    }, {
        statusOnline: "online"
    });

    _io.once("connection", (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", {
            userId: user.id,
            status: "online"
        }
        );
    });

    res.redirect("/");
};

// [GET] /user/logout
module.exports.logout = async (req, res) => {
    await User.updateOne({
        tokenUser: req.cookies.tokenUser
    }, {
        statusOnline: "offline"
    });

    _io.once("connection", (socket) => {
        socket.broadcast.emit("SERVER_RETURN_USER_STATUS_ONLINE", {
            userId: res.locals.user.id,
            status: "offline"
        }
        );
    });

    res.clearCookie("tokenUser");
    res.clearCookie("cartId");
    res.redirect("/");
};

// [GET] /user/password/forgot
module.exports.forgotPassword = async (req, res) => {
    res.render("client/pages/user/forgot-password", {
        pageTitle: "Lấy lại mật khẩu",
    });
};

// [POST] /user/password/forgot
module.exports.forgotPasswordPost = async (req, res) => {
    const email = req.body.email;

    const user = await User.findOne({
        email: email,
        deleted: false
    });

    if (!user) {
        req.flash("error", "Email không tồn tại!");
        res.redirect("back");
        return
    }

    // Lưu thông tin vào db
    const otp = generateHelper.generateRandomNumber(8);

    const objectForgotPassword = {
        email: email,
        otp: otp,
        expireAt: Date.now()
    }

    const forgotPassword = new ForgotPassword(objectForgotPassword);
    await forgotPassword.save();

    // Nếu tồn tại thì gửi OTP qua email
    const subject = "Mã OTP xác minh lấy lại mật khẩu";
    const html = `
        Mã OTP để lấy lại mật khẩu là <b>${otp}</b>. Thời hạn sử dụng là 3 phút.
    `
    sendMailHelper.sendMail(email, subject, html);

    res.redirect(`/user/password/otp?email=${email}`);
};

// [GET] /user/password/otp
module.exports.otpPassword = async (req, res) => {
    const email = req.query.email;

    res.render("client/pages/user/otp-password", {
        pageTitle: "Nhập mã OTP",
        email: email,
    });
};

// [POST] /user/password/otp
module.exports.otpPasswordPost = async (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;

    const result = await ForgotPassword.findOne({
        email: email,
        otp: otp
    });

    if (!result) {
        req.flash("error", "OTP không hợp lệ!");
        res.redirect("back");
        return
    }

    const user = await User.findOne({
        email: email
    });

    res.cookie("tokenUser", user.tokenUser);

    res.redirect("/user/password/reset");
};

// [GET] /user/password/reset
module.exports.resetPassword = async (req, res) => {
    res.render("client/pages/user/reset-password", {
        pageTitle: "Đổi mật khẩu",
    });
};

// [POST] /user/password/reset
module.exports.resetPasswordPost = async (req, res) => {
    const password = req.body.password;
    const tokenUser = req.cookies.tokenUser;

    await User.updateOne({
        tokenUser: tokenUser
    }, {
        password: md5(password)
    })

    req.flash("success", "Đổi mật khẩu thành công!");

    res.redirect("/");
};

// [GET] /user/account
module.exports.account = async (req, res) => {
    res.render("client/pages/user/account", {
        pageTitle: "Thông tin tài khoản",
    });
};

// [GET] /user/edit/:id
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    let find = {
        _id: id,
        deleted: false
    }
    const data = await User.findOne(find);

    res.render("client/pages/user/edit", {
        pageTitle: "Chỉnh sửa thông tin tài khoản",
        data: data
    });
};

// [PATCH] /user/edit/:id
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    await User.updateOne({ _id: id }, req.body);

    res.redirect("back");
};

// [GET] /user/order/:id
module.exports.getOrder = async (req, res) => {
    const user_id = req.params.id;

    const order = await Order.find({
        user_id: user_id,
        deleted: false
    })

    res.render("client/pages/user/order", {
        pageTitle: "Danh sách đơn hàng",
        order: order
    })
}

// [GET] /user/password/change
module.exports.changePassword = async (req, res) => {
    res.render("client/pages/user/change-password", {
        pageTitle: "Đổi mật khẩu",
    });
};

// [GET] /user/info/:id
module.exports.info = async (req, res) => {
    res.render("client/pages/user/info", {
        title: "Sổ địa chỉ"
    })
}

// [PATCH] /user/info/:id
module.exports.infoPatch = async (req, res) => {
    const info = {
        phone: req.body.phone,
        address: req.body.address,
        province: req.body.province
    }

    await User.updateOne(
        { _id: req.params.id },
        { info: info }
    )

    // req.flash("success", "Cập nhật thông tin thành công!");

    res.redirect("back");
}
