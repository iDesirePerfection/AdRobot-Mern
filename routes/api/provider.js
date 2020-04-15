const express = require('express');
const auth = require('../../middleware/auth');
const Provider = require('../../models/Provider');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// @route   POST api/provider
// @desc    Add new provider
// @access  PUBLIC 
router.post('/', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'plz include a valid email').isEmail(),
    check('FieldOfWork', 'FieldOfWork is required').not().isEmpty()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    };
    const { name, email, FieldOfWork } = req.body;

    try {
        let provider = await Provider.findOne({ email });
        if (provider) {

            return res.status(400).json({ errors: [{ msg: "provider already exists" }] });
        }
        provider = new Provider({
            name,
            email,
            FieldOfWork
        });
        await provider.save();
        res.json(provider);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

// @route   GET api/provider
// @desc    Get all providers
// @access  PUBLIC 
router.get('/', async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});

module.exports = router;


