const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const gravatar = require('gravatar');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

/**
 * @route POST api/users
 * @description users route
 * @access public
 */
router.post(
	'/',
	[
		check('name', 'Name is required').not().isEmpty(),
		check('email', 'Please include a valid email').isEmail(),
		check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { name, email, password } = req.body;

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		try {
			// validate user
			let user = await User.findOne({ email });

			if (user) {
				res.status(400).json({ errors: [ { msg: 'User already exist' } ] });
			}
			// create user
			const avatar = gravatar.url(email, {
				s: '200',
				r: 'pg',
				d: 'mm'
			});

			user = new User({
				name,
				email,
				avatar,
				password
			});
			// encrypt password & save user
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);
			await user.save();
			// generates token and returns it
			const token = jwt.sign({ user: { id: user.id } }, config.get('mySecrecToken'), { expiresIn: 60 * 60 * 5 });
			res.status(200).json({ token });
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
