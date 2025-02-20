// services/wordService.js
const db = require('../models/db');

// Get word details by word
const getWordDetails = (word, callback) => {
    const query = 'SELECT word, meaning, origin FROM words WHERE word = ?';
    db.query(query, [word], callback);
};

// Find words by meaning
const findWordsByMeaning = (meaning, callback) => {
    const query = 'SELECT word, meaning, origin FROM words WHERE meaning LIKE ?';
    db.query(query, [`%${meaning}%`], callback);
};

// Get all words
const getAllWords = (callback) => {
    const query = 'SELECT word, meaning, origin FROM words';
    db.query(query, [], callback);
};

module.exports = {
    getWordDetails,
    findWordsByMeaning,
    getAllWords
};
