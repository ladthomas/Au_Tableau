const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import du middleware CORS
const classroomRoutes = require('./routes/classrooms');
const studentRoutes = require('./routes/students');

const app = express();

//  CORS 
app.use(cors()); 

app.use(bodyParser.json());

// Rote  les classrooms et les students
app.use('/api/classrooms', classroomRoutes);
app.use('/api/classrooms', studentRoutes);


app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});
