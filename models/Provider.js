const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    FieldOfWork:{
        type:String,
        required:true
    }
});
module.exports = Provider = mongoose.model('provider',ProviderSchema);