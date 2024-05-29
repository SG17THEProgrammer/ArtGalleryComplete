const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncErrors = require("../middlewares/catchAsyncError.js");
const Product = require("../models/productModel.js");
const fs = require("fs") ;
const assert = require("assert");
const User = require("../models/uerModel.js");


exports.createProductController = catchAsyncErrors(async (req, res, next) =>{
    const { name, description, price,shipping } =
    req.fields;
    const useremail = req.user._id;
  const { photo } = req.files;
  //alidation
  if(!name || !description || !price ){
    return next(new ErrorHandler("please fill all the fields",400));
  }
  if(photo && photo.size > 1000000){
    return next(new ErrorHandler("photo is Required and should be less then 1mb",400));   
  }
  
  const products = new Product({ ...req.fields,user:useremail});
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  await products.save();
  res.status(201).send({
    success: true,
    message: "Product Created Successfully",
    products,
  });
})
exports.getProductController = catchAsyncErrors(async (req, res, next) =>{
  const products = await Product.find({}).select("-photo").populate("user").sort({ updatedAt: -1 });
 
  res.status(200).send({
    success: true,
    counTotal: products.length,
    message: "ALlProducts ",
    products,
  });
})
exports.getMyProductController = catchAsyncErrors(async (req, res, next) =>{
    const products = await Product.find({user : req.user._id}).select("-photo").sort({ updatedAt: -1 });
  res.status(200).send({
    success: true,
    counTotal: products.length,
     products
  });
})
exports.updateProductController = catchAsyncErrors(async (req, res, next) =>{
    const { name, description, price,shipping } =
    req.fields;
  const { photo } = req.files;

  if(!name || !description || !price ){
    return next(new ErrorHandler("please fill all the fields",400));
  }
  if(photo && photo.size > 1000000){
    return next(new ErrorHandler("photo is Required and should be less then 1mb",400));   
  }
 
  const products = await Product.findByIdAndUpdate(
    req.params.pid,
    { ...req.fields },
    { new: true }
  );
  if (photo) {
    products.photo.data = fs.readFileSync(photo.path);
    products.photo.contentType = photo.type;
  }
  await products.save();
  res.status(201).send({
    success: true,
    message: "Product Updated Successfully",
    products,
  });
})
exports.getSingleProductController = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById({ id: req.params.id })
    .select("-photo")
  res.status(200).send({
    success: true,
    message: "Single Product Fetched",
    product,
  });
})

exports.productPhotoController = catchAsyncErrors(async (req, res, next) =>{
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
})
exports.deleteProductController = catchAsyncErrors(async (req, res, next) =>{
    await Product.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
})
