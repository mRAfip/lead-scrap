const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Scrape route
app.post('/scrape', async (req, res) => {
  const { category, location } = req.body;

  // Simulate scraped data
  const data = [
    {
      firstName: 'John',
      companyName: 'Example Corp',
      website: 'https://example.com',
      contactNumber: '123-456-7890',
      email: 'john@example.com',
    },
  ];

  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});