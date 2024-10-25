const express = require('express');
const router = express.Router();
const db = require('../db');

// Récupérer tous les étudiants d'une classe
router.get('/:classroom_id/students', (req, res) => {
    const classroomId = req.params.classroom_id;

    const sql = 'SELECT * FROM students WHERE classroom_id = ?';
    db.all(sql, [classroomId], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(rows);
    });
});

// Ajouter un étudiant dans une classe
router.post('/:classroom_id/students', (req, res) => {
    const { name } = req.body;
    const classroomId = req.params.classroom_id;

    if (!name) {
        return res.status(422).json({ message: 'Le nom de l\'étudiant est requis' });
    }

    const sql = 'INSERT INTO students (name, classroom_id) VALUES (?, ?)';
    db.run(sql, [name, classroomId], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: this.lastID, name, classroom_id: classroomId });
    });
});

// Modifier le nom d'un étudiant
router.put('/:classroom_id/students/:student_id', (req, res) => {
    const { name } = req.body;
    const studentId = req.params.student_id;

    if (!name) {
        return res.status(422).json({ message: 'Le nom est requis' });
    }

    const sql = 'UPDATE students SET name = ? WHERE id = ?';
    db.run(sql, [name, studentId], function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.status(200).json({ message: 'Étudiant mis à jour' });
    });
});

// Supprimer un étudiant d'une classe
router.delete('/:classroom_id/students/:student_id', (req, res) => {
    const studentId = req.params.student_id;

    const sql = 'DELETE FROM students WHERE id = ?';
    db.run(sql, studentId, function (err) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Étudiant non trouvé' });
        }
        res.status(204).send();
    });
});

module.exports = router;
