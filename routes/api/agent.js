const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Agent = require("../../models/Agent");
const config = require('config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cryptoRandomString = require('crypto-random-string');
var nodemailer = require('nodemailer');
// @route    POST api/agents
// @desc     Register user
// @access   Public
router.post(
    "/",
    [
        check("firstName", "firstName is required")
            .not()
            .isEmpty(),
        check("lastName", "firstName is required")
            .not()
            .isEmpty(),
        check("company", "The company is required")
            .not()
            .isEmpty(),
        check("dateOfBirth", "date of birth is required").not().isEmpty(),
        check("email", "invalid email").isEmail(),
        check("password", "password has to be 6 or more caracters").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password, firstName, lastName, company, city, country, dateOfBirth } = req.body;
        try {
            //See if user exists
            let agent = await Agent.findOne({ email });
            if (agent) {
                console.log(agent.enabled);
                return res.status(400).json({ errors: [{ msg: "agent already exists" }] });
            }

            const address = {};
            address.city = city;
            address.country = country;
            const activation = cryptoRandomString({ length: 10 });
            agent = new Agent({
                email,
                password,
                firstName,
                lastName,
                company,
                address,
                dateOfBirth,
                activation
            });
            //send confirmation mail
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'adrobot2020@gmail.com',
                    pass: 'PhantomTroupe2020'
                }
            });
            const mailOptions = {
                from: 'adrobot2020@gmail.com', // sender address
                to: email, // list of receivers
                subject: 'Confirmation code', // Subject line
                html: '<p>Your confirmation code ' + activation + '</p>'// plain text body
            };
            transporter.sendMail(mailOptions, function (err, info) {
                if (err)
                    console.error(err)
                else
                    console.log(info);
            });
            //encrypt passwor(bcrypt)
            const salt = await bcrypt.genSalt(10);

            agent.password = await bcrypt.hash(password, salt);

            await agent.save();

            //reurn jsonwebtoken
            const payload = {
                agent: {
                    id: agent.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });


        } catch (err) {
            console.log(err.message);
            res.status(500).send("server error");
        }
    }
);


module.exports = router;
