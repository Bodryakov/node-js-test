const express = require("express");

module.exports = (db) => {
  const router = express.Router();


  // === CRUD ===

  // Получить все записи
  router.get("/", (req, res) => {
    db.query("SELECT * FROM items ORDER BY id DESC", (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    });
  });

  // Добавить запись
  router.post("/", (req, res) => {
    const { name, description } = req.body;
    db.query("INSERT INTO items (name, description) VALUES (?, ?)", [name, description], (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, description });
    });
  });

  // Обновить запись
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    db.query("UPDATE items SET name = ?, description = ? WHERE id = ?", [name, description, id], (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id, name, description });
    });
  });

  // Удалить запись
  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM items WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).send(err);
      res.json({ success: true });
    });
  });

  return router;
};
