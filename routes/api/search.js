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
    console.log(rep)
    var params = querystring.parse(url.parse(req.url).query);
    const { priceMax } = params
    let listTarget = [];
    console.log(Segmentation(rep))
    try {
        const list = await Offer.find();
        list.forEach(element => {
            var rep2 = Segmentation(tokenizer.tokenize(element.description));
            console.log(rep2)
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
router.get('/target/:id_offre', async (req, res) => {

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
        const calculateAge = dob => {
            let diff_ms = Date.now() - dob.getTime();
            let age_dt = new Date(diff_ms);

            return Math.abs(age_dt.getUTCFullYear() - 1970);
        }
        let cutomers = await Customer.find();
        cutomers.sort((a, b) =>
            calculateAge(a.dateOfBirth) - calculateAge(b.dateOfBirth)
        );
        console.log(cutomers)
        let ageMin = 13;
        if (!calculateAge(cutomers[0].dateOfBirth) > 13)
            ageMin = calculateAge(cutomers[0].dateOfBirth);

        let ageMax = 65

        if (calculateAge(cutomers[cutomers.length - 1].dateOfBirth) < 65)
            ageMax = calculateAge(cutomers[cutomers.length - 1].dateOfBirth)

        targeting = {
            "age_min": ageMin,
            "age_max": ageMax,
            "behaviors": [
                {
                    "id": 6002714895372,
                    "name": "All travelers"
                }
            ],
            "genders": [
                1
            ],
            "geo_locations": {
                "countries": [
                    "US"
                ],
                "regions": [
                    {
                        "key": "4081"
                    }
                ],
                "cities": [
                    {
                        "key": "777934",
                        "radius": 10,
                        "distance_unit": "mile"
                    }
                ]
            },
            "life_events": [
                {
                    "id": 6002714398172,
                    "name": "Newlywed (1 year)"
                }
            ],
            "facebook_positions": [
                "feed"
            ],
            "publisher_platforms": [
                "facebook",
                "audience_network"
            ]
        }
        res.json(targeting)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});



module.exports = router;
