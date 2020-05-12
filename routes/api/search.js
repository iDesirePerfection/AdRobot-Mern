const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const Customer = require('../../models/Customer');
const Offer = require('../../models/Offer');
const { check, validationResult } = require('express-validator');
var querystring = require('querystring');
var url = require('url');
const Segmentation = require('./segmentation');
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();
// @route   GET api/customers
// @desc    Get all customers
// @access  PUBLIC 
router.get('/offers/:question', async (req, res) => {

    console.log(req.params.question)
    var rep = req.params.question

    res.json(Segmentation(rep));






});
router.get('/fahd/:id_offre', async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id_offre);

        var list = tokenizer.tokenize(offer.description)
        var tab = [];
        console.log(list)
       
        list.forEach(element => {
            var rep = Segmentation(element);

            console.log(rep)
            if (tab.indexOf(rep) == -1)
                tab.push(rep)
        });
        res.json(obj)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
