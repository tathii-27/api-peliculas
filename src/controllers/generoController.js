const db = require('../db');

exports.getAllGeneros = (req, res) => {
    db.query('SELECT * FROM Genero', (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getGeneroById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Genero WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createGenero = (req, res) => {
    const { nombre } = req.body;
    db.query('INSERT INTO Genero (nombre) VALUES (?)', [nombre], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, nombre });
    });
};

exports.updateGenero = (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;
    db.query('UPDATE Genero SET nombre = ? WHERE id = ?', [nombre, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Género actualizado correctamente' });
    });
};

exports.deleteGenero = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Genero WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Género eliminado correctamente' });
    });
};
