const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        trim : true
    },
    email:{
        type:String,
        trim : true
    },
    subject :{
type:String,
    },
    message:{
        type:String,
        trim : true
    }

})
const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;