const pool = require('../db');

// Function fetch words from the database
function getWords(limit = 10) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM words LIMIT ?', [limit], (error, results) => {
            if (error) {
                // Create an Error object with the error message and reject the promise
                const errorMessage = error.message || 'Error fetching words from database';
                return reject(new Error(errorMessage));
            }
            resolve(results);
        });
    });
}

// Function to insert words into the database
function insertWords(words) {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO words (word) VALUES ?', [words.map(word => [word])], (error, results) => {
            if (error) {
                // Create an Error object with the error message and reject the promise
                const errorMessage = error.message || 'Error inserting words into database';
                return reject(new Error(errorMessage));
            }
            resolve(results);
        });
    });
}

module.exports = {
    getWords,
    insertWords
};
