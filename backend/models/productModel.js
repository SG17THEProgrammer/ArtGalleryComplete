const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
   
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
   
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
    user : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      
    },
   quantity : {
    type:Number,
    default: 1
   }
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
module.exports = Product;