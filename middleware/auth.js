const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) {
		res.status(401).json({ errors: [ { msg: 'No token, authorization denied' } ] });
	}
	try {
		const decoded = jwt.verify(token, config.get('mySecrecToken'));
		req.user = decoded.user;
		next();
	} catch (err) {
		res.status(401).json({ errors: [ { msg: 'Token is not valid' } ] });
	}
};
