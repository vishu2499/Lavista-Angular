let mongoose = require('mongoose');

// customer Schema
const Customer = mongoose.model('Customer', {
    name: {
        type: String,
        required:true
    }, 
    email: {
        type:String,
        required:true
    },
    cake_name: {
        type:String,
        required:true
    }
});

module.exports = {Customer}