const express = require('express');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/authenticateToken');

const app = express();
app.use(express.json());

// 1. Secure Headers (Helmet)
app.use(helmet());

// 2. Home Route (To fix "Cannot GET /" error)
app.get('/', (req, res) => {
    res.send("<h1>Security Server is Running on Port 3000</h1>");
});

// 3. Login Route (Fixing SQLi & Hashing)
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) return res.status(400).send("Missing credentials");

    // SQL Injection Protection using '?'
    pool.query('SELECT * FROM admin WHERE username = ?', [username], async (err, rows) => {
        if (err || rows.length === 0) return res.status(400).send("User not found");

        // Password Hashing check
        const isMatch = await bcrypt.compare(password, rows[0].password);
        if (isMatch) {
            const token = jwt.sign({ id: rows[0].id }, 'your-secret-key', { expiresIn: '1h' });
            res.json({ message: "Authentication successful", token: token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    });
});

// 4. Protected Routes
app.get('/list', authenticateToken, (req, res) => {
    pool.query('SELECT * FROM user', (err, result) => {
        if (err) return res.status(400).send("Error");
        res.json(result);
    });
});

app.listen(3000, () => console.log("Server running on port 3000"));
