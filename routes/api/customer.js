const express = require('express');
const auth = require('../../middleware/auth');
const Customer = require('../../models/Customer');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/customers
// @desc    Create or update customer 
// @access  Public 
router.post('/', [
    check('firstName', 'firstname is required').not().isEmpty(),
    check('lastName', 'lastname is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('dateOfBirth', 'dateOfBirth is required').not().isEmpty()
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
            street,
            postalCode,
            dateOfBirth,
            fieldOfWork,
            gender,
            religion,
            hobbies,
            phoneNumber,
            maritalStatus,
            childrenNumber

        } = req.body;

        // Build Customer object
        const customerFields = {};

        if (firstName) customerFields.firstName = firstName;
        if (lastName) customerFields.lastName = lastName;
        if (email) customerFields.email = email;

        if (dateOfBirth) customerFields.dateOfBirth = dateOfBirth;
        if (fieldOfWork) customerFields.fieldOfWork = fieldOfWork;
        if (gender) customerFields.gender = gender;
        if (religion) customerFields.religion = religion;
        if (hobbies) {
            customerFields.hobbies = hobbies;
        };

        if (phoneNumber) customerFields.phoneNumber = phoneNumber;
        if (maritalStatus) customerFields.maritalStatus = maritalStatus;
        if (childrenNumber) customerFields.childrenNumber = childrenNumber;


        customerFields.address = {};
        if (city) customerFields.address.city = city;
        if (country) customerFields.address.country = country;
        if (postalCode) customerFields.address.postalCode = postalCode;
        if (street) customerFields.address.street = street;

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
// @route   GET api/customers/:user_id
// @desc    Get profile by user id
// @access  PUBLIC 
router.get('/:user_id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.user_id);

        if (!customer) {
            return res.status(400).json({ message: 'there is no customer for this user id' });

        }

        res.json(customer);
    } catch (error) {
        console.error(error.message);
        if (error.kind == 'ObjectId') {
            return res.status(400).json({ message: 'customer not found' });

        }
        res.status(500).send('server error');
    }
});
// @route   GET api/customers/:user_id
// @desc    Get profile by user id
// @access  PUBLIC 
router.put('/update/:user_id', [
    check('firstName', 'firstname is required').not().isEmpty(),
    check('lastName', 'lastname is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('dateOfBirth', 'DateOfBirth is required').not().isEmpty()
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
            street,
            postalCode,
            dateOfBirth,
            fieldOfWork,
            gender,
            religion,
            hobbies,
            phoneNumber,
            maritalStatus,
            ChildrenNumber
        } = req.body;

       
        const customerFields = {};

        if (firstName) customerFields.firstName = firstName;
        if (lastName) customerFields.lastName = lastName;
        if (email) customerFields.email = email;

        if (dateOfBirth) customerFields.dateOfBirth = dateOfBirth;
        if (fieldOfWork) customerFields.fieldOfWork = fieldOfWork;
        if (gender) customerFields.gender = gender;
        if (religion) customerFields.religion = religion;
        if (hobbies) customerFields.hobbies = hobbies;

        if (phoneNumber) customerFields.phoneNumber = phoneNumber;
        if (maritalStatus) customerFields.maritalStatus = maritalStatus;
        if (ChildrenNumber) customerFields.ChildrenNumber = ChildrenNumber;

        customerFields.address = {};
        if (city) customerFields.address.city = city;
        if (country) customerFields.address.country = country;
        if (postalCode) customerFields.address.postalCode = postalCode;
        if (street) customerFields.address.street = street;

        try {
            let customer = await Customer.findById(req.params.user_id);
            if (!customer) {
                return res.status(400).json({ message: 'there is no customer for this user id' });
            }
            customer = await Customer.findByIdAndUpdate(
                { _id: req.params.user_id },
                { $set: customerFields },
                { new: true }
            );
            console.log("updated");
            res.json(customer);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send('server error');
        }
    }
);
// @route   DELETE api/customers
// @desc    delete profile, user & posts
// @access  private 
router.delete('/:user_id', async (req, res) => {
    try {
        console.log(req.params.user_id);
        await Customer.findOneAndRemove({ _id: req.params.user_id });
        res.json({ message: 'user removed ' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;
