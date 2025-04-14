const express = require('express');
const snowflake = require('snowflake-sdk');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());

console.log("DEBUG CREDS:", {
  user: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD ? "••••••••" : "NOT FOUND",
  account: process.env.SNOWFLAKE_ACCOUNT,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
});

// Snowflake connection setup
const connection = snowflake.createConnection({
  account: process.env.SNOWFLAKE_ACCOUNT,
  username: process.env.SNOWFLAKE_USER,
  password: process.env.SNOWFLAKE_PASSWORD,
  warehouse: process.env.SNOWFLAKE_WAREHOUSE,
  database: process.env.SNOWFLAKE_DATABASE,
  schema: process.env.SNOWFLAKE_SCHEMA,
});

// Connect to Snowflake
connection.connect((err) => {
  if (err) {
    console.error('Unable to connect:', err);
  } else {
    console.log('Connected to Snowflake');
  }
});

// Endpoint to fetch data from Snowflake
app.get('/data', (req, res) => {
  connection.execute({
    sqlText: `SELECT "c1", "c2", "c3", "c4", "c5", "c6" FROM SAMPLEWEATHERDASH.PUBLIC.MY_CSV_TABLE;`,
    complete: (err, stmt, rows) => {
      if (err) {
        console.error('Error executing query:', err.message);
        res.status(500).json({ error: err.message });
      } else {
        // Log the rows fetched from the table
        console.log("Rows fetched:", rows);
        
        // Send the rows as JSON to the frontend
        res.json({ data: rows });
      }
    }
  });
});

// Start the Express server
app.listen(3000, () => console.log('Server running on port 3000'));
