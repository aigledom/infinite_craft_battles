const puppeteer = require("puppeteer");

// Function to launch the Puppeteer browser
async function launchBrowser() {
  try {
    // Launch the browser
    const browser = await puppeteer.launch();
    return browser;
  } catch (error) {
    // Throw an error if the browser cannot be launched
    throw new Error("Error launching Puppeteer browser");
  }
}

// Export the function to launch the browser
module.exports = { launchBrowser };
