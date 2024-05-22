const express = require('express');
const router = express.Router();
const wordController = require("../controllers/wordController");

// Route to get random words
router.get("/get", wordController.getRandomWords);

// Route to insert words into the database
router.get("/insert", wordController.insertRandomWords);

// Export the router
module.exports = router;

