//This file tells mongoose to work on DB on given schema.
const mongoose = require('mongoose');

//creating schema structure
const contactSchema = new mongoose.Schema({
    name :{
        type :String,
        required : true
    },
    phone :{
        type :String,
        required : true
    }
});

//giving name to the collection as "Contact" as well as providing its schema.
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;