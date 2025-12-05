# Attendance System - Projet (démo)

Structure fournie. Ce projet est conçu **mobile-first** et propose deux modes de stockage : JSON (par défaut) et MySQL (optionnel).

## Installation (local)
1. Copier `attendance-system/` dans le répertoire www de ton serveur local (ex : `C:\wamp64\www\attendance-system`).
2. Assure-toi que `php/config.php` contient le chemin `data_dir` correct (par défaut `../data`).
3. Ouvrir `http://localhost/attendance-system/css/index.html` dans le navigateur.
4. Les endpoints PHP écrivent dans `attendance-system/data/` (assure-toi que ce dossier est accessible en écriture).

## Utilisation
- **Ajouter étudiant** : `css/add-student.html` -> envoie vers `php/students/add_student.php` et met à jour `data/students.json`.
- **Prise de présence** : `css/attendance.html` -> charge les étudiants et enregistre le fichier `data/attendance_YYYY-MM-DD.json`.
- **Rapports** : `css/reports.html` -> liste les fichiers `attendance_*.json`.

## Notes techniques
- Validation côté client basique (regex).
- Authentification `php/users/login_simple.php` : utilisateur de démonstration `admin/admin`.
- Pour une DB MySQL, configurer `php/config.php` et utiliser `php/db_connect.php`.

## Améliorations possibles
- Remplacer chart drawing par Chart.js pour des graphiques avancés.
- Ajouter pagination et recherche côté serveur.
- Ajouter protection CSRF et validation côté serveur plus stricte.
- API RESTful propre.

