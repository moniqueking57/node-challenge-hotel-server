const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

//Use this array as your (in-memory) data store.
const bookings = require('./bookings');

app.get('/', function (request, response) {
  response.send('Hotel booking server.  Ask for /bookings, etc.');
});

app.post('/bookings', function (req, res) {
  const {id, title, firstName} = req.body;
  if (!id || !title || !firstName) {
    res.status(400).json({message: 'fields are missing'});
  } else {
    const newBooking = {
      id,
      title,
      firstName,
    };
    bookings.push(newBooking);
    res.send('Booking created');
  }
});

app.get('/bookings', function (req, res) {
  res.send(bookings);
});

app.get('/bookings/:ID', function (req, res) {
  const specificBooking = bookings.filter(
    (booking) => booking.id == req.params.ID
  );
  if (!specificBooking) {
    return res.status(404).json({
      msg: 'Not found',
    });
  } else {
    return res.status(200).json({
      specificBooking,
    });
  }
});

app.delete('/bookings/:ID', function (req, res) {
  const index = bookings.findIndex((bookings) => bookings.id == req.params.ID);
  if (index !== -1) {
    bookings.splice(index);
    res.send(bookings);
  } else {
    res.send("It doesn't exist!!!");
  }
});

// TODO add your routes and helper functions here

const listener = app.listen(process.env.PORT || 8080, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
