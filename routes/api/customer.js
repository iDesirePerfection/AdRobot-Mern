const express = require('express');
const auth = require('../../middleware/auth');
const Customer = require('../../models/Customer');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/customers
// @desc    Create or update customer 
// @access  Private 
router.post('/', [
    check('firstName', 'firstname is required').not().isEmpty(),
    check('lastName', 'lastname is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('DateOfBirth', 'DateOfBirth is required').not().isEmpty()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }



        const {
            firstName,
            lastName,
            email,
            city,
            country,
            DateOfBirth,
            fieldOfWork,
            gender,
            religion,
            hobbies,
            phoneNumber,
            maritalStatus

        } = req.body;

        // Build Customer object
        const customerFields = {};

        if (firstName) customerFields.firstName = firstName;
        if (lastName) customerFields.lastName = lastName;
        if (email) customerFields.email = email;

        if (DateOfBirth) customerFields.DateOfBirth = DateOfBirth;
        if (fieldOfWork) customerFields.fieldOfWork = fieldOfWork;
        if (gender) customerFields.gender = gender;
        if (religion) customerFields.religion = religion;
        if (hobbies) {
            customerFields.hobbies = hobbies.split(',').map(hobbies => hobbies.trim());
        };

        if (phoneNumber) customerFields.phoneNumber = phoneNumber;
        if (maritalStatus) customerFields.maritalStatus = maritalStatus;

        customerFields.address = {};
        if (city) customerFields.address.city = city;
        if (country) customerFields.country = country;

        try {
            let customer = await Customer.findOne({ email });
            if (customer) {
                //update

                customer = await Customer.findOneAndUpdate(
                    { email },
                    { $set: customerFields },
                    { new: true }
                );
                console.log("updated");
                return res.json(customer);
            }
            //create

            customer = new Customer(customerFields);
            await customer.save();
            console.log("created");
            res.json(customer);


        } catch (error) {
            console.error(error.message);
            return res.status(500).send('server error');
        }
    }
);
// @route   GET api/customers
// @desc    Get all customers
// @access  PUBLIC 
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;
