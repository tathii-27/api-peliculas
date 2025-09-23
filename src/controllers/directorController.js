const db = require('../db');

exports.getAllDirectores = (req, res) => {
    db.query('SELECT * FROM Director', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getDirectorById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Director WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createDirector = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Director (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
};

exports.updateDirector = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Director SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Director actualizado correctamente' });
    });
};

exports.deleteDirector = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Director WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Director eliminado correctamente' });
    });
};