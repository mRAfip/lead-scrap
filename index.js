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

app.post('/scrape', async (req, res) => {
  const { category, location } = req.body;

  // Launch Puppeteer
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Example: Scrape LinkedIn (replace with actual scraping logic)
  await page.goto(`https://www.linkedin.com/search/results/companies/?keywords=${category}&location=${location}`);

  // Extract data (this is a placeholder - you'll need to customize this)
  const data = await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll('.company-result');
    items.forEach((item) => {
      const name = item.querySelector('.company-name')?.innerText || 'N/A';
      const website = item.querySelector('.company-website')?.innerText || 'N/A';
      results.push({
        firstName: name.split(' ')[0],
        companyName: name,
        website,
        contactNumber: 'N/A',
        email: 'N/A',
      });
    });
    return results.slice(0, 100); // Return first 100 results
  });

  await browser.close();
  res.json(data);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});