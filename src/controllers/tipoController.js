const db = require('../db');

exports.getAllTipos = (req, res) => {
    db.query('SELECT * FROM Tipo', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getTipoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Tipo WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createTipo = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Tipo (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
};

exports.updateTipo = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Tipo SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Tipo actualizado correctamente' });
    });
};

exports.deleteTipo = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Tipo WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Tipo eliminado correctamente' });
    });
};