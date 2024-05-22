const DatabaseModel = require('../models/DatabaseModel');

// Method to fetch all table names from the database
async function dashboard(req, res){
    try {
        const tables = await DatabaseModel.fetchAllTableData();
        res.status(200).json({tables});
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to fetch table names' });
    }
}

// Method to create a backup of the database
async function createBackup(req, res) {
    try {
        // Specify the file path where the backup will be saved
        const backupFilePath = '../backup.sql';
        // Create the backup
        const backupFile = await DatabaseModel.createBackup(backupFilePath);
        res.status(200).json({ message: 'Database backup created successfully', backupFile });
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create database backup' });
    }
}

// Method to restore the database from a backup
async function restoreDatabase(req, res) {
    try {
        // Specify the file path of the backup to restore
        const backupFilePath = '../backup.sql';
        // Restore the database
        await DatabaseModel.restoreDatabase(backupFilePath);
        res.status(200).json({ message: 'Database restored successfully' });
    }  catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to restore database' });
    }
}

module.exports = {
    dashboard,
    createBackup,
    restoreDatabase
};