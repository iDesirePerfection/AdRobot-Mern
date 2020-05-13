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

// @route   GET api/search
// @desc    Get all offers matched 
// @access  PRIVATE 
router.get('/offers/:question', async (req, res) => {
    var rep = req.params.question
    var params = querystring.parse(url.parse(req.url).query);
    const { priceMax } = params
    let listTarget = [];
    console.log(Segmentation(rep))
    try {
        const list = await Offer.find();
        list.forEach(element => {
            var rep2 = Segmentation(tokenizer.tokenize(element.description));

            if (listTarget.indexOf(element) == -1) {
                if (rep2 == Segmentation(rep) || Segmentation(rep) == "all offers")
                    listTarget.push(element)

            }
        });

        if (priceMax) {
            listTarget.forEach(element => {
                if (element.minimumPrice > priceMax)
                    listTarget.splice(listTarget.indexOf(element));
            });
        }

        res.json(listTarget)


    } catch (error) {
        console.error(error.messsage);
        res.status(500).send('server error');
    }


});
router.get('/fahd/:id_offre', async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id_offre);
        console.log(offer)
        var list = tokenizer.tokenize(offer.description)
        var tab = [];
        console.log(list)
        console.log(Segmentation(offer.description))
        list.forEach(element => {
            var rep = Segmentation(element);

            console.log(rep)
            if (tab.indexOf(rep) == -1)
                tab.push(rep)
        });
        res.json(tab)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});


module.exports = router;
