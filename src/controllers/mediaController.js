const db = require('../db');

exports.getAllMedia = (req, res) => {
    const query = `
        SELECT m.id, m.titulo, m.descripcion, m.fecha_lanzamiento,
               g.nombre AS genero,
               d.nombre AS director,
               p.nombre AS productora,
               t.nombre AS tipo
        FROM Media m
        LEFT JOIN Genero g ON m.id_genero = g.id
        LEFT JOIN Director d ON m.id_director = d.id
        LEFT JOIN Productora p ON m.id_productora = p.id
        LEFT JOIN Tipo t ON m.id_tipo = t.id
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

exports.getMediaById = (req, res) => {
    const { id } = req.params;
    const query = `
        SELECT m.id, m.titulo, m.descripcion, m.fecha_lanzamiento,
               g.nombre AS genero,
               d.nombre AS director,
               p.nombre AS productora,
               t.nombre AS tipo
        FROM Media m
        LEFT JOIN Genero g ON m.id_genero = g.id
        LEFT JOIN Director d ON m.id_director = d.id
        LEFT JOIN Productora p ON m.id_productora = p.id
        LEFT JOIN Tipo t ON m.id_tipo = t.id
        WHERE m.id = ?
    `;
    db.query(query, [id], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results[0]);
    });
};

exports.createMedia = (req, res) => {
    const { titulo, descripcion, fecha_lanzamiento, id_genero, id_director, id_productora, id_tipo } = req.body;
    const query = 'INSERT INTO Media (titulo, descripcion, fecha_lanzamiento, id_genero, id_director, id_productora, id_tipo) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [titulo, descripcion, fecha_lanzamiento, id_genero, id_director, id_productora, id_tipo], (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(201).json({ id: results.insertId, titulo });
    });
};

exports.updateMedia = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha_lanzamiento, id_genero, id_director, id_productora, id_tipo } = req.body;
    const query = `
        UPDATE Media 
        SET titulo = ?, descripcion = ?, fecha_lanzamiento = ?, id_genero = ?, id_director = ?, id_productora = ?, id_tipo = ?
        WHERE id = ?
    `;
    db.query(query, [titulo, descripcion, fecha_lanzamiento, id_genero, id_director, id_productora, id_tipo, id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Media actualizada correctamente' });
    });
};

exports.deleteMedia = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Media WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: err });
        res.json({ message: 'Media eliminada correctamente' });
    });
};