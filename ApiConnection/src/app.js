const express = require('express');
const path = require('path');

const app = express();

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/api/booking', require('./routes/bookings.routes'));
app.use('/api/simulation', require('./routes/simulation.routes'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});