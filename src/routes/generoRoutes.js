const express = require("express");
const router = express.Router();
const pool = require("../db"); // importa la conexión compartida

// GET todos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM generos");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por ID
router.get("/:id", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM generos WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear
router.post("/", async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "Falta el nombre" });

    const [result] = await pool.query("INSERT INTO generos (nombre) VALUES (?)", [nombre]);
    res.status(201).json({ id: result.insertId, nombre });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT actualizar
router.put("/:id", async (req, res) => {
  try {
    const { nombre } = req.body;
    const [result] = await pool.query("UPDATE generos SET nombre = ? WHERE id = ?", [nombre, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ message: "Actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE eliminar
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM generos WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ message: "Eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
