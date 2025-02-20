// app.js
const express = require('express');
const db = require('./models/db.js');
const wordRoutes = require('./routes/wordRoutes.js');
const path = require("path");
const favicon = require("serve-favicon");

const app = express();
const port = 3000;

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use('/api/words', wordRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
