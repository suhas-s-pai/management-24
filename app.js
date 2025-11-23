const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.log("MySQL Connection Failed:", err);
        return;
    }
    console.log("MySQL Connected!");
});

// Register API
app.post("/register", (req, res) => {
    const { name, email, mobile, usn } = req.body;

    if (!name || !email || !mobile || !usn) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO participants (name, email, mobile, usn) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, email, mobile, usn], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.json({ message: "Participant Registered Successfully!" });
    });
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
