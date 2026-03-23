# User Management System (Cybersecurity Internship)

## 📌 Project Overview
This repository contains the progress of my Cybersecurity internship, focusing on web application security and vulnerability mitigation.

## 📂 Repository Structure
- **app.js**: Initial version with security flaws (SQL Injection & Plain-text passwords).
- **secure_app.js**: Final version with security implementations.
- **index.js**: Entry point for the secured server.
- **middleware/**: Contains security logic like `authenticateToken.js`.

## 🛡️ Security Features Implemented
1. **JWT (JSON Web Tokens)**: Secure user session management.
2. **Bcrypt**: Password hashing to prevent credential exposure.
3. **Helmet.js**: Protection against common web vulnerabilities via HTTP headers.
4. **Parameterized Queries**: To mitigate SQL Injection attacks.
