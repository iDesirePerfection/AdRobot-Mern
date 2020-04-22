const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Agent = require("../../models/Agent");
const Offre = require("../../models/Offer");
const Provider = require("../../models/Provider");
const config = require('config');
const auth = require('../../middleware/auth');



// @route    POST api/offer
// @desc     Add offre
// @access   Private
router.post(
    "/", [auth,
    [
        check("title", "title is required")
            .not()
            .isEmpty(),
        check("description", "description is required")
            .not()
            .isEmpty(),
        check("field", "The field is required")
            .not()
            .isEmpty(),
        check("from", "from is required").not().isEmpty(),
        check("to", "to is required").not().isEmpty(),
        check("minimumPrice", "minimumPrice is required").not().isEmpty(),
        check("discount", "discount is required").not().isEmpty()

    ]
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { title, description, field, from, to, minimumPrice, discount } = req.body;
        try {
            //See if provider exists
            let agent = await Agent.findById(req.agent.id);
            let provider = await Provider.findOne({ name: agent.company });
            if (!provider) {

                return res.status(400).json({ errors: [{ msg: "provider doesn't exist" }] });
            }
            let offer = await Offre.findOne({ title });
            if (offer) {
                return res.status(400).json({ errors: [{ msg: "offre already exist" }] });
            }

            const offreFields = {};
            offreFields.provider = provider.id;
            if (title) offreFields.title = title;
            if (description) offreFields.description = description;
            if (field) offreFields.field = field;
            if (from) offreFields.from = from;
            if (to) offreFields.to = to;
            if (minimumPrice) offreFields.minimumPrice = minimumPrice;
            if (discount) offreFields.discount = discount;

            offer = new Offre(offreFields);
            await offer.save();
            res.json(offer);

        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);
// @route   GET api/offer
// @desc    Get all offers by provider
// @access  PRIVATE 
router.get('/', async (req, res) => {
    try {
        // let agent = await Agent.findById(req.agent.id);
        // console.log(agent.firstName);

        // let provider = await Provider.findOne({ name: agent.company });
        // console.log(provider.name);
        // const offers = await Offre.find({ provider: provider.id }).populate('providers', ['name', 'email']);
        const offers = await Offre.find();
        res.json(offers);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
// @route   DELETE api/offer
// @desc    delete offer
// @access  private 
router.delete('/:offer_id', async (req, res) => {
    try {



        await Offre.findOneAndRemove({ _id: req.params.offer_id });

        res.json({ message: 'offer removed ' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
});
module.exports = router;