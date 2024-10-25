const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Connexion à la base de données SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.sqlite'), (err) => {
    if (err) {
        console.error('Erreur lors de l\'ouverture de la base de données', err.message);
    } else {
        console.log('Connecté à la base de données SQLite');
    }
});

// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS classrooms (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            classroom_id INTEGER,
            FOREIGN KEY (classroom_id) REFERENCES classrooms(id) ON DELETE CASCADE
        )
    `);
});

module.exports = db;
