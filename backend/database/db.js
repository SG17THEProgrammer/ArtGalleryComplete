const mongoose = require('mongoose');
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL||"mongodb+srv://yash98305:yash98305@cluster0.gk4tfjv.mongodb.net/Art_Gallery",{family:4})
        console.log("mongodb connected.....")
    } catch (error) {
        console.log("error" + error.message)
    }
}
module.exports = connectDB