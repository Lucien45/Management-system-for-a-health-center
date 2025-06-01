![Clinique Santé Banner](./client/public/white.png)

# 🏥 Management System for a Health Center / Private Clinic HMS

Ce projet est une plateforme web moderne conçue pour aider les centres de santé et les cliniques privées à gérer efficacement leurs opérations quotidiennes. Elle offre des fonctionnalités complètes pour la gestion des patients, des rendez-vous, des consultations, des prescriptions, des stocks de médicaments, et bien plus encore, à travers une interface intuitive et responsive.

---

## 🚀 Fonctionnalités

- 🔐 Authentification sécurisée pour administrateurs, médecins, infirmiers et réceptionnistes

- 👩‍⚕️ Gestion des utilisateurs (patients, médecins, personnel médical, administrateurs)

- 📅 Gestion des rendez-vous avec calendrier dynamique

- 🩺 Analyse des symptômes et diagnostic lors des consultations

- 💊 Gestion des prescriptions médicales

- 📦 Gestion du stock de médicaments

- 🧾 Suivi des dossiers médicaux des patients

- 📊 Tableaux de bord analytiques pour visualiser les performances et activités

- 🌍 Interface responsive accessible sur mobile, tablette et desktop

---

## 🛠️ Technologies utilisées

- **Frontend :**
  - React.js – Framework moderne pour construire des interfaces utilisateur interactives
  - Tailwind CSS – Framework CSS utilitaire pour un design rapide et réactif
  - Material UI – Librairie de composants pour une expérience utilisateur fluide

- **Backend :**
  - Nest.js – Framework Node.js puissant et modulaire pour des API robustes
  - TypeORM avec MongoDB – ORM utilisé pour structurer les données NoSQL dans MongoDB

- **Base de données :**
  - MongoDB – Base de données NoSQL performante, idéale pour les applications web modernes

- **Autres outils :**
  - Git & GitHub – Pour le versionnement et la collaboration
  - JIRA – Pour la gestion agile du projet
  - Docker – Pour le déploiement et la gestion des environnements

---

## 📂 Structure du projet
```bash
Health-center-management/ 
│── client/ 
│   ├── node_modules/
│   ├── public/          
│   ├── src/
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── routes
│   │   ├── app.css
│   │   ├── app.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts  
│   ├── tsconfig.app.json  
│   ├── tsconfig.node.json  
│   ├── tsconfig.json  
│── server/ 
│   ├── dist/
│   ├── node_modules/
│   ├── src/
│   ├── test/
│   ├── .nest-cli.json
│   ├── package.json
│   ├── tsconfig.build.json  
│   ├── tsconfig.json  
│── README.md       
```

## ⚙️ Installation & Démarrage

- **🔑 Prérequis :**
  - Node.js >= 16.x
  - MongoDB installé localement ou accessible via un service cloud
  - Docker (optionnel pour le déploiement)

## 📦 Déploiement
```bash
  docker-compose up --build
```

## ✍️ Auteur
- Nom: RAFARALAHY Savaka Lucien
- Email: savakalucien@gmail.com
