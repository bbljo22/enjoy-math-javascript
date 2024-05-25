const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URL = process.env.MONGODB_URL;
if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined. Please set it in the .env file.");
}

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });

// Define a model (assuming ./models/Item.js exists and is correctly set up)
const Item = require("./models/Item");

// Routes
app.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
