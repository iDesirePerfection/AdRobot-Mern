const mongoose = require('mongoose');

const AgentSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    activation: {
        type: String
    },
    enabled: {
        type: Boolean,
        default: false
    }
});
module.exports = Agent = mongoose.model('agent', AgentSchema);