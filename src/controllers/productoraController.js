const db = require('../db');

exports.getAllProductoras = (req, res) => {
    db.query('SELECT * FROM Productora', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getProductoraById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Productora WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createProductora = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Productora (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
};

exports.updateProductora = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Productora SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Productora actualizada correctamente' });
    });
};
exports.deleteProductora = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Productora WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Productora eliminada correctamente' });
    });
};