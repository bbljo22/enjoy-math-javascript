// Import express library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Use cors middleware to handle CORS
app.use(cors());

// Define a port number
const PORT = process.env.PORT || 5000;

// Define a POST endpoint
app.post('/', (req, res) => {
  const { lat, lon } = req.body;
  console.log(`Received coordinates: Latitude = ${lat}, Longitude = ${lon}`);

  // Respond with a JSON object
  res.json({ status: 'success', lat, lon });
});

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
