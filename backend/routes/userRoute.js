const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/userController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")
const { validator } = require("../middlewares/userValidationMiddleware.js");
const { userValidationSchema } = require("../Validators/userValidator.js");

router.route('/login').post(pages.userLoginController)
router.route('/register').post(validator(userValidationSchema),pages.userRegisterController)
router.route('/updateprofile/:id').put(isAuthenticatedUser,formidable(),pages.updateProfile)
router.route('/photo/:pid').get(pages.getAllUsersPhotoController)
router.route('/myprofile').get(isAuthenticatedUser,isAuthenticatedUser,pages.getUserDetailsController)
router.route("/forgotPassword").post(pages.forgotPasswordController);
router.route('/postOTP').post(pages.postOTPController);
router.route("/password/update").put(isAuthenticatedUser, pages.updatePassword);

module.exports = router