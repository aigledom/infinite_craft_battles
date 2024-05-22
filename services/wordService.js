const puppeteerHelper = require("../helpers/puppeteerHelper");

// Function to generate random words
async function generateRandomWords(numberOfWords) {
  try {
    // Initialize the array to store the generated words
    const wordList = [];
    // Launch the browser to the page where words are generated
    const browser = await puppeteerHelper.launchBrowser();
    const page = await browser.newPage();
    await page.goto(
      "https://gadgetmates.com/infinite-craft-random-word-generator"
    );
    // Accept cookies if present
    await page.waitForSelector(".sc-qRumB.bcoUVc.amc-focus-first", {
      timeout: 3000,
    });
    await page.click(".sc-qRumB.bcoUVc.amc-focus-first");
    // Click the button and extract words
    await page.waitForSelector("#infinite-craft-random-word-generator button", {
      timeout: 3000,
    });
    for (let i = 0; i < numberOfWords; i++) {
      await page.click("#infinite-craft-random-word-generator button");
      // Wait for the word to be generated upon click and then extract it
      await page.waitForSelector("#random-word-output", { timeout: 3000 });
      let randomWord = await page.evaluate(() => {
        return document.querySelector("#random-word-output").textContent.trim();
      });
      // Add the word to the array
      wordList.push(randomWord);
    }
    // Close the browser once the process is finished
    await browser.close();
    // Return the array of generated words
    return wordList;
  } catch (error) {
    // Throw an error if there is a problem during word generation
    throw new Error(error.message);
  }
}

// Export the generateRandomWords function
module.exports = {
  generateRandomWords,
};