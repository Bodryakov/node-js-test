const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к БД
const db = mysql.createConnection({
  host: "localhost",
  user: "p-351366_node-js-test",
  password: "Anna-140275",
  database: "p-351366_node-js-test"
});

db.connect(err => {
  if (err) {
    console.error("Ошибка подключения к БД:", err);
    process.exit(1);
  }
  console.log("✅ Подключено к MySQL");
});

// Мидлвары
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Создаём таблицу, если её нет
db.query(`
  CREATE TABLE IF NOT EXISTS items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

// === CRUD ===

// Получить все записи
app.get("/api/items", (req, res) => {
  db.query("SELECT * FROM items ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Добавить запись
app.post("/api/items", (req, res) => {
  const { name, description } = req.body;
  db.query("INSERT INTO items (name, description) VALUES (?, ?)", [name, description], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, name, description });
  });
});

// Обновить запись
app.put("/api/items/:id", (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.query("UPDATE items SET name = ?, description = ? WHERE id = ?", [name, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ id, name, description });
  });
});

// Удалить запись
app.delete("/api/items/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ success: true });
  });
});

app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));