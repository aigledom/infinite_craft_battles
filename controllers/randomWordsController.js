const puppeteerHelper = require("../helpers/puppeteerHelper");
const randomWordsService = require("../services/randomWordsService");

async function getRandomWords(req, res) {
    try {
        // Generate random words using the randomWordsService
        const wordList = await randomWordsService.generateRandomWords();
        // Render the view with the generated words
        res.render('index', { wordList });
    } catch (error) {
        // Handle errors and send a response with status code 500
        res.status(500).json({ error: error.message });
    }
}

// Export the getRandomWords function
module.exports = {
  getRandomWords,
};