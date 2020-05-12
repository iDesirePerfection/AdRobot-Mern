const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OfferSchema = new Schema({
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'providers'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    field:{
        type:String,
        required:true
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    minimumPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
       
    }
});

module.exports = Offer = mongoose.model('offer', OfferSchema);
