const puppeteerHelper = require("../helpers/puppeteerHelper");

// Function to generate random words
async function generateRandomWords(numberOfWords) {
  try {
    const wordList = [];
    const browser = await puppeteerHelper.launchBrowser();
    const page = await browser.newPage();
    await page.goto("https://gadgetmates.com/infinite-craft-random-word-generator");
    
    // Accept cookies if present
    await page.waitForSelector(".sc-qRumB.bcoUVc.amc-focus-first", { timeout: 3000 }).then(async () => {
      await page.click(".sc-qRumB.bcoUVc.amc-focus-first");
    }).catch(() => {
      console.log("Cookies accept button not found, continuing without clicking.");
    });
    
    // Click the button and extract words
    await page.waitForSelector("#infinite-craft-random-word-generator button", { timeout: 3000 });
    for (let i = 0; i < numberOfWords; i++) {
      await page.click("#infinite-craft-random-word-generator button");
      // Wait for the word to be generated upon click and then extract it
      await page.waitForSelector("#random-word-output", { timeout: 3000 });
      // Add delay to ensure word generation
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5 seconds dela
      let randomWord = await page.evaluate(() => {
        return document.querySelector("#random-word-output").textContent.trim();
      });
      // Log the extracted word for debugging
      console.log(`Extracted word ${i + 1}:`, randomWord);
      // Add the word to the array if not empty
      if (randomWord) {
        wordList.push(randomWord);
      } else {
        console.error(`Error: Retrieved empty word at iteration ${i + 1}`);
      }
    }
    await browser.close();
    return wordList;
  } catch (error) {
    throw new Error(`Error generating random words: ${error.message}`);
  }
}

// Export the generateRandomWords function
module.exports = {
  generateRandomWords,
};
