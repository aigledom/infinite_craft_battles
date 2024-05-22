const pool = require('../db');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

// Function to get all tables in the database
async function getAllTables() {
    return new Promise((resolve, reject) => {
        // Query to fetch all table names from the information_schema.tables table
        const query = 'SELECT table_name FROM information_schema.tables WHERE table_schema = ?';
        // Execute the query
        pool.query(query, [pool.config.connectionConfig.database], (error, results) => {
            if (error) {
                // Reject the promise if there's an error
                reject(new Error(`Failed to fetch tables: ${error.message}`));
            } else {
                // Extract table names from the results
                const tables = results.map(row => row.table_name);
                // Resolve the promise with the list of tables
                resolve(tables);
            }
        });
    });
}

// Function to fetch data from all tables in the database
async function fetchAllTableData() {
    try {
        const tables = await getAllTables();
        const tablesData = {};

        // Loop through each table name
        for (const table of tables) {
            const tableData = await fetchTableData(table);
            tablesData[table] = tableData;
        }

        return tablesData;
    } catch (error) {
        throw new Error(`Failed to fetch data from tables: ${error.message}`);
    }
}

// Function to fetch data from a specific table
function fetchTableData(tableName) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ${tableName}`;
        pool.query(query, (error, results) => {
            if (error) {
                reject(new Error(`Failed to fetch data from table ${tableName}: ${error.message}`));
            } else {
                resolve(results);
            }
        });
    });
}

// Function to create a backup of the database
async function createBackup(backupFilePath) {
    try {
        // Command to create a backup using mysqldump
        const command = `mysqldump -u ${pool.config.connectionConfig.user} -p${pool.config.connectionConfig.password} ${pool.config.connectionConfig.database} > ${backupFilePath}`;
        // Execute the command
        await exec(command);
        return backupFilePath;
    } catch (error) {
        throw new Error(`Failed to create backup: ${error.message}`);
    }
}

// Function to restore a database from a backup
async function restoreDatabase(backupFilePath) {
    try {
        // Command to restore the database using the backup file
        const command = `mysql -u ${pool.config.connectionConfig.user} -p${pool.config.connectionConfig.password} ${pool.config.connectionConfig.database} < ${backupFilePath}`;
        // Execute the command
        await exec(command);
        return true; // Indicates success
    } catch (error) {
        throw new Error(`Failed to restore database: ${error.message}`);
    }
}

module.exports = {
    fetchAllTableData,
    fetchTableData,
    createBackup,
    restoreDatabase
};