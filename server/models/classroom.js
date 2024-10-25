const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClassroomSchema = new Schema({
    name: { type: String, required: true, unique: true },
    students: [{ type: String }]  // Liste de noms d'étudiants
});

module.exports = mongoose.model('Classroom', ClassroomSchema);
