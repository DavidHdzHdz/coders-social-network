const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

/**
 * @route GET api/auth
 * @description authentication route
 * @access public
 */
router.get('/', auth, async (req, res) => {
	try {
		const userData = await User.findById(req.user.id).select('-password');
		console.log(userData);
		res.status(200).json(userData);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

/**
 * @route POST api/auth
 * @description authentication login route
 * @access public
 */
router.post(
	'/',
	[ check('email', 'Invalid Email').isEmail(), check('password', 'Password is required').exists() ],
	async (req, res) => {
		const errors = validationResult(req);
		const { email, password } = req.body;

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}

		try {
			const user = await User.findOne({ email });
			if (!user) {
				res.status(400).json({ errors: [ { msg: 'Invalid Email or Password' } ] });
			}
			const isPasswordsMatched = await bcrypt.compare(password, user.password);
			if (!isPasswordsMatched) {
				res.status(400).json({ errors: [ { msg: 'Invalid Email or Password' } ] });
			}
			const token = jwt.sign({ user: { id: user.id } }, config.get('mySecrecToken'), { expiresIn: 60 * 60 });
			res.status(200).json({ token });
		} catch (err) {
			console.error(err);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
