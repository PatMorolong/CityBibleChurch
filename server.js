// filepath: c:\Users\USER\Downloads\City Christian Academy\city-bible-church-website\server.js
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'city-bible-church-website' directory
app.use(express.static(path.join(__dirname, 'city-bible-church-website')));

// Serve index.html as the default file for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'city-bible-church-website', 'index.html'));
});

// Handle all other routes and fallback to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'city-bible-church-website', 'index.html'));
});

// Use the PORT provided by Render or default to 10000
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));