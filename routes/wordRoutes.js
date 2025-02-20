const express = require('express');
const wordService = require('./wordService');
const router = express.Router();

// Get all words
router.get('/all', (req, res) => {
    wordService.getAllWords((err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'No words found in the database' });
        }

        // Remove the `id` field from each word object in the response
        const words = rows.map(({ id, ...wordDetails }) => wordDetails);
        const formattedResponse = words
            .map(word => JSON.stringify(word))
            .join('\n');

        res.set('Content-Type', 'text/plain'); // Set response content type to plain text
        res.send(formattedResponse);
    });
});

// Get word details by word
router.get('/:word', (req, res) => {
    const { word } = req.params;

    if (!word) {
        return res.status(400).json({ error: 'Word parameter is required' });
    }

    wordService.getWordDetails(word, (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: 'Word not found' });
        }

        // Remove the `id` field from the response
        const { id, ...wordDetails } = row;
        res.set('Content-Type', 'text/plain');
        res.json(wordDetails);
    });
});

// Find words by meaning
router.get('/', (req, res) => {
    const { meaning } = req.query;

    if (!meaning) {
        return res.status(400).json({ error: 'Meaning query parameter is required' });
    }

    wordService.findWordsByMeaning(meaning, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!rows || rows.length === 0) {
            return res.status(404).json({ error: 'No words found with the given meaning' });
        }

        // Remove the `id` field from each word object in the response
        const words = rows.map(({ id, ...wordDetails }) => wordDetails);
        const formattedResponse = words
            .map(word => JSON.stringify(word))
            .join('\n');

        res.set('Content-Type', 'text/plain'); // Set response content type to plain text
        res.send(formattedResponse);
    });
});



module.exports = router;