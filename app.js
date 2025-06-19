const express = require('express');
const cors = require('cors');
const organizationsRouter = require('./routes/organizations');
const usersRouter = require('./routes/users');
const devicesRouter = require('./routes/devices');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/orgs', organizationsRouter);
app.use('/api/users', usersRouter);
app.use('/api/devices', devicesRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Server error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});