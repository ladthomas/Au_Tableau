# Webstart - Au Tableau

## 📚 Aperçu du projet

Cette application est développée pour les professeurs de Webstart afin de leur permettre de gérer les classes d'étudiants et d'organiser les soutenances. L'application permet de :
- Créer, modifier, et gérer des classes d'étudiants.
- Sélectionner aléatoirement des étudiants pour passer au tableau durant une soutenance.
- Suivre les étudiants qui ont déjà présenté, le tout en utilisant `localStorage` pour la gestion côté client.

## 🛠️ Fonctionnalités principales

- ✅ **Gestion des classes :**
  - Création, modification et suppression de classes.
  - Chaque classe est unique, un étudiant ne peut pas appartenir à plusieurs classes.

- ✅ **Gestion des étudiants :**
  - Ajouter, modifier et supprimer des étudiants dans une classe.
  - Un étudiant ne peut pas être dupliqué dans une classe (pas de doublons).

- ✅ **Gestion des soutenances :**
  - Sélection aléatoire d'étudiants pour qu'ils passent au tableau.
  - Une seule soutenance peut être gérée à la fois.
  - Suivi des étudiants ayant déjà présenté.
  - **Bonus :** Gestion des statistiques de passage :
    - Visualisation des étudiants qui ont déjà présenté ou qui doivent encore passer.
    - Possibilité de forcer ou annuler le passage d'un étudiant.

## 💻 Frontend

- **Technologie :** JavaScript pur (Vanilla JS, aucune bibliothèque ni framework autorisé).
- **Style :** Vous êtes libre d'utiliser le framework CSS de votre choix.
- **Gestion des données :** Les données sont gérées localement via `localStorage`.

### 🖥️ Interface utilisateur

- 🎲 Un bouton permet de sélectionner un étudiant de manière aléatoire pour qu'il passe au tableau.
- ✅ Une fois que tous les étudiants sont passés, un message l'indiquera.
- **Bonus :** Affichage des statistiques de passage des étudiants.

## 🔧 Backend

- **Technologie :** Express.js (aucune bibliothèque tierce, sauf celle pour la base de données).
- **Base de données :** MongoDB, MySQL, PostgreSQL ou SQLite (au choix).
- **API :** Gestion des classes et des étudiants via des endpoints REST.

### 🌐 API Endpoints

- `/classrooms`
  - **GET** : Récupérer la liste des classes.
  - **POST** : Créer une classe avec le paramètre `name`.
  - **DELETE** : Supprimer une classe.
  - **PUT/PATCH** : Modifier une classe.

- `/classrooms/:classroom_id/students`
  - **GET** : Récupérer la liste des étudiants d'une classe.
  - **POST** : Ajouter un étudiant avec le paramètre `name`.
  - **DELETE** : Supprimer un étudiant d'une classe.
  - **PUT/PATCH** : Modifier un étudiant.

## 📄 Liens utiles

- [Site Web de Webstart](https://ecole-webstart.com)
