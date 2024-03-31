const puppeteerHelper = require("../helpers/puppeteerHelper");

// Function to generate random words
async function generateRandomWords() {
  try {
    // Initialize the array to store the generated words
    const wordList = [];
    // Launch the browser to the page where words are generated
    const browser = await puppeteerHelper.launchBrowser();
    const page = await browser.newPage();
    await page.goto(
      "https://gadgetmates.com/infinite-craft-random-word-generator"
    );
    // Wait for the accept cookies button to be available and click it
    await page.waitForSelector(".sc-qRumB.bcoUVc.amc-focus-first", {
      timeout: 3000,
    });
    await page.click(".sc-qRumB.bcoUVc.amc-focus-first");
    // Wait for the button to be available and then click it 9 times to get
    // the words to fill the list
    await page.waitForSelector("#infinite-craft-random-word-generator button", {
      timeout: 3000,
    });
    for (let i = 0; i < 9; i++) {
      await page.click("#infinite-craft-random-word-generator button");
      // Wait for the word to be generated upon click and then extract it
      await page.waitForSelector("#random-word-output");
      const randomWord = await page.evaluate(() => {
        return document.querySelector("#random-word-output").textContent.trim();
      });
      // Add the word to the array
      wordList[i] = randomWord;
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