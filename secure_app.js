const express = require('express');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helmet = require('helmet');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

let users = [];

app.get('/', (req, res) => {
    res.send(`<h1>User Management System</h1>
    <a href="/signup">Signup</a> | <a href="/login">Login</a> | <a href="/search">Search</a>`);
});

app.get('/signup', (req, res) => {
    res.send(`<form method="POST">
    <input name="username" placeholder="Username"><br>
    <input name="email" placeholder="Email"><br>
    <input name="password" type="password"><br>
    <button>Signup</button></form>`);
});

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!validator.isEmail(email)) {
        return res.send("Invalid Email");
    }

    if (!validator.isLength(password, { min: 6 })) {
        return res.send("Weak Password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ username, email, password: hashedPassword });

    res.send("Signup Successful");
});

app.get('/login', (req, res) => {
    res.send(`<form method="POST">
    <input name="email"><br>
    <input name="password" type="password"><br>
    <button>Login</button></form>`);
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);

    if (!user) return res.send("User not found");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send("Wrong password");

    const token = jwt.sign({ email }, "secret-key");

    res.send(`Login success<br>Token: ${token}`);
});

app.get('/search', (req, res) => {
    let query = req.query.q || "";

    query = validator.escape(query);

    res.send(`<form>
    <input name="q">
    <button>Search</button></form>
    <p>${query}</p>`);
});

app.listen(3000, () => console.log("Secure app running"));
