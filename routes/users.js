const express = require('express');
const { check, validationResult } = require('express-validator/check');
const router = express.Router();

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
	(req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
		}
		// See if user exist

		// Get users gravatar

		// Encrypt password

		// Return jsonwebtoken

		res.status(200).json(req.body);
	}
);

module.exports = router;
