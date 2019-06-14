const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const { check, validationResult } = require('express-validator/check');
const User = require('../models/User');
const ObjectId = require('mongoose').Types.ObjectId;
const request = require('request');
const config = require('config');

/**
 * @route GET api/profile/me
 * @description get user logged profile route
 * @access private
 */
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', [ 'name', 'avatar' ]);
		if (!profile) {
			return res.status(404).json({ errors: [ { msg: 'There is no profile for this user' } ] });
		}
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route POST api/profile
 * @description post profile data of current logged user if already exist will be updated
 * @access private
 */
router.post(
	'/',
	auth,
	[
		check('status', 'Status is Required').not().isEmpty(),
		check('skills', 'Skills are Required').isArray(),
		check('skills', 'Put min one Skill').isLength({ min: 1 })
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const {
			company,
			website,
			location,
			status,
			skills,
			bio,
			githubUsername,
			experience,
			education,
			social
		} = req.body;

		const profileField = {};
		profileField.user = req.user.id;
		if (company) profileField.company = company;
		if (website) profileField.website = website;
		if (location) profileField.location = location;
		profileField.status = status;
		profileField.skills = skills;
		if (bio) profileField.bio = bio;
		if (githubUsername) profileField.githubUsername = githubUsername;
		if (experience) profileField.experience = experience;
		if (education) profileField.education = education;
		if (social) profileField.social = social;

		try {
			let profile = await Profile.findOne({ user: req.user.id });
			if (profile) {
				profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileField }, { new: true });
				return res.status(200).json(profile);
			}
			profile = new Profile(profileField);
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/**
 * @route GET api/profile
 * @description get all profiles
 * @access public
 */
router.get('/', async (_, res) => {
	try {
		const profile = await Profile.find().populate('user', [ 'name', 'avatar' ]);
		if (!profile) {
			return res.status(404).json({ errors: [ { msg: 'There is no profiles yet' } ] });
		}
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route GET api/profile/:user_id
 * @description get profile by user id
 * @access public
 */
router.get('/:user_id', async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', [ 'name', 'avatar' ]);
		if (!profile) {
			return res.status(404).json({ errors: [ { msg: 'Profile No found' } ] });
		}
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		if ((err.kind = 'ObjectId')) {
			return res.status(404).json({ errors: [ { msg: 'Profile No found' } ] });
		}
		res.status(500).send('Server Error');
	}
});

/**
 * @route DELETE api/profile
 * @description delete current logged profile, user & posts
 * @access private
 */
router.delete('/', auth, async (req, res) => {
	try {
		await Profile.findOneAndDelete({ user: req.user.id });
		await User.findOneAndDelete({ _id: req.user.id });
		res.status(200).json({ message: 'Account Deleted' });
	} catch (err) {
		console.log(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route PUT api/profile/experience
 * @description put experience on currentr logged user
 * @access private
 */
router.put(
	'/experience',
	auth,
	[
		check('title', 'title is required').not().isEmpty(),
		check('company', 'company is required').not().isEmpty(),
		check('from', 'from is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { title, company, location, from, to, current, description } = req.body;

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (!profile) {
				return res.status(404).json({ error: [ { msg: 'Profile not found' } ] });
			}
			profile.experience.unshift({ title, company, location, from, to, current, description });
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/**
 * @route DELETE api/profile/experience/experience_id
 * @description delete an experience item by its id
 * @access private
 */
router.delete('/experience/:experience_id', auth, async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.experience_id)) {
			return res.status(400).json({ errors: [ { msg: 'No experience item found' } ] });
		}

		let profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(404).json({ errors: [ { msg: 'Profile Not Found' } ] });
		}
		profile.experience = profile.experience.filter((expItem) => expItem.id !== req.params.experience_id);
		await profile.save();
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route PUT api/profile/education
 * @description put education on current logged user
 * @access private
 */
router.put(
	'/education',
	auth,
	[
		check('school', 'school is required').not().isEmpty(),
		check('degree', 'degree is required').not().isEmpty(),
		check('fieldOfStudy', 'fieldOfStudy is required').not().isEmpty(),
		check('from', 'from is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);
		const { school, degree, fieldOfStudy, from, to, current, description } = req.body;

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		try {
			let profile = await Profile.findOne({ user: req.user.id });

			if (!profile) {
				return res.status(404).json({ error: [ { msg: 'Profile not found' } ] });
			}
			profile.education.unshift({ school, degree, fieldOfStudy, from, to, current, description });
			await profile.save();
			res.status(200).json(profile);
		} catch (err) {
			console.log(err.message);
			res.status(500).send('Server Error');
		}
	}
);

/**
 * @route DELETE api/profile/education/education
 * @description delete an education item by its id
 * @access private
 */
router.delete('/education/:education_id', auth, async (req, res) => {
	try {
		if (!ObjectId.isValid(req.params.education_id)) {
			return res.status(404).json({ errors: [ { msg: 'No education item found' } ] });
		}

		let profile = await Profile.findOne({ user: req.user.id });

		if (!profile) {
			return res.status(404).json({ errors: [ { msg: 'Profile Not Found' } ] });
		}
		profile.education = profile.education.filter((eduItem) => eduItem.id !== req.params.education_id);
		await profile.save();
		res.status(200).json(profile);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

/**
 * @route GET api/profile/github/:user_name?page
 * @description delete an education item by its id
 * @access public
 */
router.get('/github/:username', async (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${req.params
				.username}/repos?per_page=5&sort=created:asc&client_id=${config.get(
				'githubClientId'
			)}&client_secret=${config.get('githubClientSecret')}&page=${req.query.page | '1'}`,
			method: 'GET',
			headers: { 'user-agent': 'node.js' }
		};
		request(options, (err, response, body) => {
			if (err) {
				console.error(err);
				return res.status(500).send('Server Error');
			}
			if (response.statusCode !== 200) {
				return res.status(404).json({ errors: [ { msg: 'No Github profile found' } ] });
			}
			res.status(200).json(JSON.parse(body));
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
