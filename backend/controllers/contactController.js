const catchAsyncError = require("../middlewares/catchAsyncError");
const Contact = require("../models/contactModel");
const ErrorHandler = require("../utils/errorHandler");
exports.contactController = catchAsyncError(async(req,res,next)=>{
const name = req.user.name;
const email = req.user.email;
const subject = req.body.subject;
const message = req.body.message;

if(!name || !email || !subject || !message){
    return next(new ErrorHandler("Please Enter Required Field", 400));
}

const contact = await new Contact({
name,email,subject,message
}).save();

res.status(201).send({
    success: true,
    message: "Message Sent Successfully",
    contact,
})
})