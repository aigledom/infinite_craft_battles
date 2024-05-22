const wordService = require("../services/wordService");
const wordModel = require('../models/wordModel');

//Controller function to get words from the database
async function getRandomWords(req, res) {
    try {
        // Default to getting 10 words if count is not provided
        const numberOfWords  = req.query.numberOfWords || 10;
        // Fetch the word list from the database using the retrieved number of words
        const wordList = await wordModel.getRandomWords(numberOfWords);
        // Render the view with the fetched word list
        res.render('index', { wordList });
    } catch (error) {
        console.log(error);
        // Handle errors and send a response with status code 500
        res.status(500).json({ error: "Error getting random words" });
    }
}

// Controller function to insert words into the database
async function insertRandomWords(req, res){
    try {
        // Default to generating 10 words if count is not provided
        const numberOfWords  = req.query.numberOfWords || 10;
        // Generate random words using the randomWordsService
        const randomWords = await wordService.generateRandomWords(numberOfWords);
        // Insert the generated random words into the database
        await wordModel.insertRandomWords(randomWords);
        // Send a success response
        res.status(200).json({ message: 'Random words inserted into database' });
    } catch (error) {
        console.log(error);
        // Handle errors and send a response with status code 500
        res.status(500).json({error: "Error generating random words"});
    }
}

// Export the getRandomWords function
module.exports = {
  getRandomWords,
  insertRandomWords,
};