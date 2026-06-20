const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* ================= LOGIN ================= */
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    `SELECT * FROM users WHERE email=? AND password=?`,
    [email, password],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const u = results[0];

      res.json({
        user: {
          id: u.id,
          full_name: u.full_name,
          email: u.email,
          role: u.role
        }
      });
    }
  );
});

/* ================= USERS ================= */
app.get('/api/admin/users', (req, res) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

/* ================= WASTE ================= */
app.get('/api/admin/waste', (req, res) => {
  db.query(`SELECT * FROM waste_posts`, (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

/* ================= REQUESTS ================= */
app.get('/api/requests', (req, res) => {
  db.query(`SELECT * FROM waste_requests`, (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

app.listen(5000, () => console.log('Server running'));