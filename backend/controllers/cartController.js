const catchAsyncError = require("../middlewares/catchAsyncError.js");
const User = require("../models/uerModel.js");
const Product = require("../models/productModel.js");
const Cart = require("../models/cartModel.js");
const ErrorHandler = require("../utils/errorHandler.js");

exports.addProductsInCart = catchAsyncError(async(req,res,next)=>{
    const productId = req.params.id;
    const userId = req.user._id;
    const products = await Product.findById(productId);
    if(!products){
        return next(new ErrorHandler("Product not found",404));
    }
    const cart = await Cart.findOne({userId});
    if(!cart){
        const newCart = new Cart({userId, productId: [productId]});
        await newCart.save();
        return res.status(200).send({
            success: true,
            message: "Product added to cart",
        })
    }
  
  
    if(cart.productId.includes(productId)){
        return res.status(200).send({
            success: true,
            message: "Product already in cart",
            cart: cart
        })
    }
    await Cart.updateOne({userId},{$push: {
        productId ,
        $position: 0
    }
});
// console.log(1)
    return res.status(200).send({
        success: true,
        message: "Product added to cart"
    })
})

exports.showProductsInCart = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id;
    const cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(200).send({
            success: true,
            message: "Cart is empty",
        })
    }
    const products = await Product.find({_id: {$in: cart.productId}}).select("-photo")
    res.status(200).send({
        success: true,
        message: "Products in cart",
        products
    })
})

exports.deleteProductFromCart = catchAsyncError(async(req,res,next)=>{
    const productId = req.params.id;
    const userId = req.user._id;
    const cart = await Cart.findOne({userId});
    if(!cart){
        return res.status(200).send({
            success: true,
            message: "Cart is empty",
        })
    }
    if(!cart.productId.includes(productId)){
        return res.status(200).send({
            success: true,
            message: "Product not in cart",
        })
    }
    await Cart.updateOne({userId},{$pull: {
        productId : productId
    }})

    res.status(200).send({
        success: true,
        message: "Product removed from cart"
    })
})
