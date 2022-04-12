const mongoose = require('mongoose');
var validator = require("email-validator");

var employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required'
    },
    nxb: {
        type: String
    },
    tacgia: {
        type: String
    },
    soluong: {
        type: String
    },
    gia: {
        type: String
    },
})

// custom validation for email

// employeeSchema.path('email').validate((val) => {
//     return validator.validate(val);
// }, 'Invalid Email');

mongoose.model('Employee', employeeSchema);