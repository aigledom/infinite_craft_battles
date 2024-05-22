const express = require("express");
const path = require("path");
const wordRoutes = require("./routes/wordRoutes");
const errorHandler = require("./errorHandler");

const app = express();
const port = 3000;

// Set the folder for views
app.set("views", path.join(__dirname, "views"));
// Set the template engine
app.set("view engine", "ejs");

// Middleware to parse JSON data
app.use(express.json());
// Middleware to parse form data
app.use(express.urlencoded({ extended: false }));
// Middleware to serve static files
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to Infinite Craft Battles!");
});

// Use the word routes
app.use("/words", wordRoutes);

// Error handler
app.use(errorHandler);

// Route to start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
