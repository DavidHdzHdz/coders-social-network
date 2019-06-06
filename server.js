const express = require('express');
const connectDB = require('./config/db');
const app = express();
const PORT = process.env.PORT || 5000;

// db instance
connectDB();
// middleware
app.use(express.json({ extended: false }));
// root api menssage and routes
app.get('/', (req, res) => res.send('API running'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/posts', require('./routes/posts'));
// app initialization
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
