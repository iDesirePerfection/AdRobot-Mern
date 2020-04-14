const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema= new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        city:{
            type:String
        },
        country:{
            type:String
        }
    },
    DateOfBirth:{
        type:Date,
        required:true
    },
    fieldOfWork:{
        type:String,
    },
    gender:{
        type:String,
    },
    religion:{
        type:String
    },
    hobbies:{
        type:[String]
    },
    phoneNumber:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    ChildrenNumber:{
        type:Number
    },
    loginHistory:{
        type:String
    }
});
module.exports = Customer = mongoose.model('customer',CustomerSchema);