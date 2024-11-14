
const classNameInput = document.getElementById('className');
const addClassBtn = document.getElementById('addClassBtn');
const resetClassInputBtn = document.getElementById('resetClassInputBtn');
const classList = document.getElementById('classList');
const studentNameInput = document.getElementById('studentName');
const addStudentBtn = document.getElementById('addStudentBtn');
const resetStudentInputBtn = document.getElementById('resetStudentInputBtn');
const studentList = document.getElementById('studentList');
const randomStudentBtn = document.getElementById('randomStudentBtn');
let currentClassId = null; // ID de la classe sélectionnée
let currentStudentId = null; // ID de l'étudiant sélectionné

// récupérer et afficher toutes les classes
function getClasses() {
    fetch('http://localhost:3000/api/classrooms')
        .then(response => response.json())
        .then(classes => {
            classList.innerHTML = '';
            classes.forEach(classe => {
                const li = document.createElement('li');
                li.classList.add('mb-2');
                li.innerHTML = `
                    <span>${classe.name}</span>
                    <button class="button is-warning is-small" onclick="editClass(${classe.id}, '${classe.name}')">Modifier</button>
                    <button class="button is-danger is-small" onclick="deleteClass(${classe.id})">Supprimer</button>
                `;
                li.onclick = () => selectClass(classe.id, classe.name);
                classList.appendChild(li);
            });
        })
        .catch(err => console.error('Erreur lors de la récupération des classes:', err));
}

//  ajouter une classe
function addClass() {
    const name = classNameInput.value.trim();
    if (!name) {
        alert('Veuillez entrer un nom de classe');
        return;
    }

    fetch('http://localhost:3000/api/classrooms', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la création de la classe');
        }
        return response.json();
    })
    .then(newClass => {
        alert(`Classe ${newClass.name} créée avec succès`);
        getClasses();
        classNameInput.value = ''; // Réinitialiser le champ de saisie
    })
    .catch(err => console.error('Erreur lors de la création de la classe:', err));
}

//  sélectionner une classe
function selectClass(classId, className) {
    currentClassId = classId;
    document.getElementById('currentClassName').textContent = className;
    getStudents(classId);
}

// récupérer et afficher tous les étudiants
function getStudents(classId) {
    fetch(`http://localhost:3000/api/classrooms/${classId}/students`)
        .then(response => response.json())
        .then(students => {
            studentList.innerHTML = '';
            students.forEach(student => {
                const li = document.createElement('li');
                li.classList.add('mb-2');
                li.innerHTML = `
                    <span>${student.name}</span>
                    <button class="button is-warning is-small" onclick="editStudent(${student.id}, '${student.name}')">Modifier</button>
                    <button class="button is-danger is-small" onclick="deleteStudent(${student.id})">Supprimer</button>
                `;
                studentList.appendChild(li);
            });
        })
        .catch(err => console.error('Erreur lors de la récupération des étudiants:', err));
}

// ajouter un étudiant à une classe
function addStudent() {
    const name = studentNameInput.value.trim();
    if (!name) {
        alert('Veuillez entrer un nom d\'étudiant');
        return;
    }

    fetch(`http://localhost:3000/api/classrooms/${currentClassId}/students`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'étudiant');
        }
        return response.json();
    })
    .then(newStudent => {
        alert(`Étudiant ${newStudent.name} ajouté avec succès`);
        getStudents(currentClassId);
        studentNameInput.value = ''; // Réinitialiser le champ de saisie
    })
    .catch(err => console.error('Erreur lors de l\'ajout de l\'étudiant:', err));
}

//  appeler un étudiant au hasard
function callRandomStudent() {
    fetch(`http://localhost:3000/api/classrooms/${currentClassId}/students`)
        .then(response => response.json())
        .then(students => {
            if (students.length === 0) {
                alert('Il n\'y a pas d\'étudiants dans cette classe.');
                return;
            }
            const randomIndex = Math.floor(Math.random() * students.length);
            const randomStudent = students[randomIndex];
            alert(`L'étudiant sélectionné est : ${randomStudent.name}`);
        })
        .catch(err => console.error('Erreur lors de la sélection aléatoire d\'un étudiant:', err));
}

// modifier une classe
function editClass(classId, currentName) {
    const newName = prompt('Modifier le nom de la classe:', currentName);
    if (newName === null || newName.trim() === '') return;

    fetch(`http://localhost:3000/api/classrooms/${classId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la modification de la classe');
        }
        getClasses();
    })
    .catch(err => console.error('Erreur lors de la modification de la classe:', err));
}

// supprimer une classe
function deleteClass(classId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette classe ?')) return;

    fetch(`http://localhost:3000/api/classrooms/${classId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de la classe');
        }
        getClasses();
    })
    .catch(err => console.error('Erreur lors de la suppression de la classe:', err));
}

// modifier un étudiant
function editStudent(studentId, currentName) {
    const newName = prompt('Modifier le nom de l\'étudiant:', currentName);
    if (newName === null || newName.trim() === '') return;

    fetch(`http://localhost:3000/api/classrooms/${currentClassId}/students/${studentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la modification de l\'étudiant');
        }
        getStudents(currentClassId);
    })
    .catch(err => console.error('Erreur lors de la modification de l\'étudiant:', err));
}

// supprimer un étudiant
function deleteStudent(studentId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) return;

    fetch(`http://localhost:3000/api/classrooms/${currentClassId}/students/${studentId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de l\'étudiant');
        }
        getStudents(currentClassId);
    })
    .catch(err => console.error('Erreur lors de la suppression de l\'étudiant:', err));
}

// Ajouter les événements 
addClassBtn.addEventListener('click', addClass);
resetClassInputBtn.addEventListener('click', () => classNameInput.value = '');
addStudentBtn.addEventListener('click', addStudent);
resetStudentInputBtn.addEventListener('click', () => studentNameInput.value = '');
randomStudentBtn.addEventListener('click', callRandomStudent);

// Charger les classes au démarrage de l'application
getClasses();
