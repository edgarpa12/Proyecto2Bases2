const express = require('express');
const path = require('path');

const app = express();

// Db connection
const { mysql } = require('./index');

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use('/api/booking', require('./routes/bookings.routes'));


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});