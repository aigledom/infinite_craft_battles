const pool = require('../db');

// Function fetch words from the database
function getRandomWords(limit = 10) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM words ORDER BY RAND() LIMIT ?', [limit], (error, results) => {
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
async function insertRandomWords(words) {
    console.log(words);
    // Array to store the results for each word
    const results = [];
    // Loop through each word in the array
    for (const word of words) {
        try {
            const exists = await wordExists(word);
            if (!exists) {
                // Construct the insertion query
                const query = 'INSERT INTO words (name) VALUES (?)';
                // Execute the insertion query with the word as a parameter
                const result = await pool.query(query, [word]);
                // Push the result into the results array
                results.push(result);
            } else {
                // If the word already exists, push a message into the results array
                results.push(`Word '${word}' already exists in the database`);
            }
        } catch (error) {
            throw new Error(`Error inserting word: ${error.message}`);
        }
    }
    return results;
}

// Function to check if a word exists in the database
function wordExists(word) {
    return new Promise((resolve, reject) => {
        pool.query('SELECT COUNT(*) AS count FROM words WHERE name = ?', [word], (error, results) => {
            if (error) {
                reject(new Error(`Error checking if word exists: ${error.message}`));
            } else {
                // Check if the count is greater than 0 to determine existence
                resolve(results[0].count > 0);
            }
        });
    });
}

module.exports = {
    getRandomWords,
    insertRandomWords
};
