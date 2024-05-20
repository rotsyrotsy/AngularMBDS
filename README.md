### _Rafamantanantsoa Rotsy Vonimanitra_
### _Ratsirarson Joharisoa_

# AssignmentApp
<img src="https://miro.medium.com/v2/resize:fit:1400/1*Klh1l7wkoG6PDPb9A5oCHQ.png" width="150">
Frontend du projet Angular 17 pour les étudiants du Master MIAGE Madagascar 2024.

## Introduction
Le projet AssignmentApp est une application Angular - NodeJS, gérant les devoirs des étudiants d'une école.
Chaque étudiant a un compte sur l'application, lui permettant d'y déposer ses devoirs afin que le professeur
correspondant le note et le rende. Chaque professeur joue le rôle d'administrateur, qui ajoute leurs matières
sur le système, note les devoirs, donne des remarques et les rendent.

La partie frontend du projet montre le flux des devoirs dans le système.
Nous avons effectué plusieurs tâches et les avons réparties par module frontend et backend.

## Contribution

### Améliorations
* Mise en place d'un layout global pour toutes les pages
* Liste des assignments sous forme de Material Card
* Formulaire de type Stepper pour l'ajout et modification des assignments
* Restriction des fonctionnalités de suppression et modification des assignments aux professeurs (admin)
* Contrainte d'ajout de note et remarque avant le rendu d'un assignment
* Modifications du auth guard et des permissions par rôle

### Ajout de nouvelles fonctionnalités
* Ajout d'une ToolBar et d'un Sidenav
* Page de login
* Page d'inscription avec formulaire de type Stepper
* Ajout de photo de profil pour les utilisateurs et image des matières
* Onglets pour les assignments rendus et non rendu avec possibilité de drag & drop pour le rendu
* Ajout de messages de notification (SnackBar Material)
* Profil utilisateur avec possibilité de modification des données
* Déploiement du front sur [vercel](https://nodejs.org/en/download/prebuilt-installer)

## Installation et test
1. Clonez ce repository sur votre machine locale
`git clone https://github.com/rotsyrotsy/AngularMBDS.git`

2. Installez node 21.1.0 depuis [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

3. Installez Angular 17
`npm install -g @angular/cli@17`

4. Placez-vous à la racine du projet et lancez les commandes suivantes
```sh
npm build
ng serve
```

Ces commandes construisent l'application et lancent un serveur de développement. Vous pouvez accéder à l'application dans votre navigateur en allant à l'adresse `http://localhost:4200`.
