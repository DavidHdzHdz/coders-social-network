const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// db instance
connectDB();
// middleware
app.use(express.json({ extended: false }));
// cors headers
app.use((_, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
// root api menssage and routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/posts', require('./routes/posts'));
// app initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
