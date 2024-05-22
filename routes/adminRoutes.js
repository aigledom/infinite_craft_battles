const express = require('express');
const router = express.Router();
const adminController = require("../controllers/adminController");

// Route to view the admin dashboard
router.get("/dashboard", adminController.dashboard);

// Route to create a database backup
router.get("/backup", adminController.createBackup);

// Route to restore the database from a backup
router.post("/restore", adminController.restoreDatabase);

// Export the router
module.exports = router;
