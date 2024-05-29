const express = require('express')
const router = express.Router()
const formidable = require("express-formidable");
const pages = require('../controllers/productController.js')
const {isAuthenticatedUser} = require("../middlewares/authMiddlewaresUser.js")

router.route('/create-product').post(formidable(),isAuthenticatedUser,pages.createProductController)
router.route("/update-product/:pid").put(isAuthenticatedUser,formidable(),pages.updateProductController);
router.route("/get-product").get(pages.getProductController)
router.route("/get-myproduct").get(formidable(),isAuthenticatedUser,pages.getMyProductController)
router.route("/product-photo/:pid").get(pages.productPhotoController)
router.route("/get-product/:id").get(pages.getSingleProductController)
router.route("/delete-product/:pid").delete(isAuthenticatedUser,pages.deleteProductController)

module.exports = router