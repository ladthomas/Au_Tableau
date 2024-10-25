const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import du middleware CORS
const classroomRoutes = require('./routes/classrooms');
const studentRoutes = require('./routes/students');

const app = express();

//  CORS pour autoriser les requêtes cross-origin
app.use(cors()); // Ceci permet à toutes les origines d'accéder à l'API

//  bodyParser pour parser les JSON dans les requêtes
app.use(bodyParser.json());

// Routes pour les classrooms et les students
app.use('/api/classrooms', classroomRoutes);
app.use('/api/classrooms', studentRoutes);

// Démarrer le serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
