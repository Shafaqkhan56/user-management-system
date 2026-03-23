const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

// Mock Database
let users = [{ username: 'admin', password: 'password123', bio: 'I am the boss' }];

app.get('/', (req, res) => {
    res.send(`
        <h1>User Management System</h1>
        <nav>
            <a href="/login">Login</a> | <a href="/signup">Signup</a> | <a href="/search">Search Users</a>
        </nav>
        <p>Welcome! Please login to see your profile.</p>
    `);
});

app.get('/signup', (req, res) => {
    res.send('<h2>Signup</h2><form method="POST"><input name="username" placeholder="Username"><br><input name="password" type="password" placeholder="Password"><br><button>Register</button></form>');
});

app.post('/signup', (req, res) => {
    users.push({ username: req.body.username, password: req.body.password, bio: 'New User' });
    res.send('Signup Successful! <a href="/login">Login here</a>');
});

app.get('/login', (req, res) => {
    res.send('<h2>Login</h2><form method="POST"><input name="username" placeholder="Username"><br><input name="password" type="password" placeholder="Password"><br><button>Login</button></form>');
});

app.post('/login', (req, res) => {
    const { username } = req.body;
    // VULNERABLE TO SQL INJECTION
    if (username.includes("' OR 1=1")) {
        res.send(`<h1>Welcome Admin!</h1><p>Your Bio: Full System Access Granted.</p><a href="/">Home</a>`);
    } else {
        res.send("Invalid Credentials.");
    }
});

app.get('/search', (req, res) => {
    const query = req.query.q || "";
    // VULNERABLE TO XSS
    res.send(`<h2>Search Users</h2><form><input name="q"><button>Search</button></form><p>Results for: ${query}</p>`);
});

app.listen(3000, () => console.log('User Management System running at http://localhost:3000'));
