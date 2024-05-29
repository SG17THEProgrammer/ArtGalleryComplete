const express = require('express')
const router = express.Router()
const pages = require('../controllers/cartController.js')
const { isAuthenticatedUser } = require('../middlewares/authMiddlewaresUser.js');

router.route('/add-cartproducts/:id').post(isAuthenticatedUser,pages.addProductsInCart)
router.route('/show-cartproducts').get(isAuthenticatedUser,pages.showProductsInCart)
router.route('/delete-cartproduct/:id').delete(isAuthenticatedUser,pages.deleteProductFromCart)
module.exports = router