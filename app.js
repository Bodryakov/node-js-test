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

// Подключаем маршруты
const itemsRoutes = require("./items");
app.use("/api/items", itemsRoutes(db));

app.listen(PORT, () => console.log(`🚀 Сервер запущен на порту ${PORT}`));
