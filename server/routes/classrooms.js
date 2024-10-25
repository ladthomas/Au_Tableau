const express = require('express');
const router = express.Router();
const db = require('../db');

// Récupérer toutes les classes
router.get('/', (req, res) => {
    db.all('SELECT * FROM classrooms', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Créer une nouvelle classe
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(422).json({ message: 'Le nom de la classe est requis' });
    }

    const sql = 'INSERT INTO classrooms (name) VALUES (?)';
    db.run(sql, [name], function (err) {
        if (err) {
            return res.status(409).json({ message: 'Cette classe existe déjà' });
        }
        res.status(201).json({ id: this.lastID, name });
    });
});

// Modifier le nom d'une classe
router.put('/:id', (req, res) => {
    const { name } = req.body;
    const classroomId = req.params.id;

    if (!name) {
        return res.status(422).json({ message: 'Le nom est requis' });
    }

    const sql = 'UPDATE classrooms SET name = ? WHERE id = ?';
    db.run(sql, [name, classroomId], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }
        res.status(200).json({ message: 'Classe mise à jour' });
    });
});

// Supprimer une classe
router.delete('/:id', (req, res) => {
    const classroomId = req.params.id;

    const sql = 'DELETE FROM classrooms WHERE id = ?';
    db.run(sql, classroomId, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Classe non trouvée' });
        }
        res.status(204).send();
    });
});

module.exports = router;
