const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'gamestation_db'
});

db.connect((err) => {
    if (err) console.log("KABEL PUTUS! Database gagal: " + err.message);
    else console.log("KABEL NYAMBUNG! Database Terhubung.");
});

// LOGIN
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length > 0) {
            res.json({ 
                Status: "Success", 
                Role: results[0].role, 
                Name: results[0].username,
                Token: "session-active-123" 
            });
        } else {
            res.status(401).json({ Status: "Error", Message: "Email atau Password Salah" });
        }
    });
});

// CRUD PRODUK
app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM products ORDER BY id DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post('/api/products', (req, res) => {
    const { name, price, stock, category } = req.body;
    db.query("INSERT INTO products (name, price, stock, category) VALUES (?, ?, ?, ?)", [name, price, stock, category], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ Status: "Success" });
    });
});

app.delete('/api/products/:id', (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ Status: "Success" });
    });
});

app.post('/api/orders', (req, res) => {
    const { customer_name, total_price, payment_method } = req.body;
    const sql = "INSERT INTO orders (customer_name, total_price, payment_method) VALUES (?, ?, ?)";
    db.query(sql, [customer_name, total_price, payment_method], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ Status: "Success" });
    });
});

// Ambil semua pesanan (Untuk Admin)
app.get('/api/orders', (req, res) => {
    db.query("SELECT * FROM orders ORDER BY order_date DESC", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Update Status Pesanan (Untuk Admin)
app.put('/api/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    db.query("UPDATE orders SET status = ? WHERE id = ?", [status, id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ Status: "Success", Message: "Status Updated" });
    });
});

app.listen(5000, () => console.log("Backend standby di port 5000..."));