const express = require("express");
const router = express.Router();
const multer = require('multer');

const uploadCloud = require("../../middlewares/client/uploadCloud.middleware");
const upload = multer();

const controller = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
const authMiddleware = require("../../middlewares/client/auth.middleware");

router.get('/register', controller.register);

router.post('/register', validate.registerPost, controller.registerPost);

router.get('/login', controller.login);

router.post('/login', validate.loginPost, controller.loginPost);

router.get('/logout', controller.logout);

router.get('/password/forgot', controller.forgotPassword);

router.post('/password/forgot', validate.forgotPasswordPost, controller.forgotPasswordPost);

router.get('/password/otp', controller.otpPassword);

router.post('/password/otp', controller.otpPasswordPost);

router.get('/password/reset', controller.resetPassword);

router.post('/password/reset', validate.resetPasswordPost, controller.resetPasswordPost);

router.get('/account', authMiddleware.requireAuth, controller.account);

router.get('/edit/:id', authMiddleware.requireAuth, controller.edit);

router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloud.upload,
    authMiddleware.requireAuth,
    controller.editPatch
);

router.get('/order/:id', authMiddleware.requireAuth, controller.getOrder);

router.get('/password/change', controller.changePassword);

router.get('/info/:id', controller.info);

router.patch('/info/:id', controller.infoPatch);

// router.post('/password/reset', validate.resetPasswordPost, controller.resetPasswordPost);

module.exports = router;