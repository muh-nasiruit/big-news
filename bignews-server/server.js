const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');
const bodyParser = require('body-parser');

const port = process.env.PORT || 4000;

// Middleware for parsing JSON requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/crawl', async (req, res) => {
  try {
    const { url } = req.body;
    console.log(url)

    if (!url) {
      return res.status(400).json({ error: 'URL is required in the request body' });
    }

    const response = await axios.get(url);
    const { data } = response;

    const dom = new JSDOM(data, {
      url,
      contentType: 'text/html',
    });

    const { document } = dom.window;

    const reader = new Readability(document);
    const article = reader.parse();
    if (article.textContent == null) {
        res.json({ content: article.textContent });
    }
    const filArticle = article.textContent.replace(/\n/g, '')
      // Calculate the midpoint index
    const midpoint = Math.floor(filArticle.length / 2);

    // Slice the string from the beginning to the midpoint
    const halfString = filArticle.slice(0, midpoint);
    console.log('content crawled')
    res.json({ content: halfString });
  } catch (error) {
    console.error('Error crawling the URL:', error);
    res.status(500).json({ error: 'An error occurred while crawling the URL' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
