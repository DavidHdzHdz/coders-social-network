const express = require('express');
const router = express.Router();

/**
 * @route GET api/profile
 * @description profile route
 * @access public
 */
router.get('/', (req, res) => {
	res.send('Profile Route');
});

module.exports = router;
