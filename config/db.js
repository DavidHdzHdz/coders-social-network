const mongoose = require('mongoose');
// with config package we can import the values into /config/default.json
const config = require('config');
const db = config.get('mongoURI');

// database connection with moongoose using data of database on config
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false
		});
		console.log('connecting to database...');
	} catch (err) {
		// finish  the process with error param
		process.exit(1);
	}
};

module.exports = connectDB;
