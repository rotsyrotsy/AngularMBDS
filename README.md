# AssignmentApp 📖
<img src="https://miro.medium.com/v2/resize:fit:1400/1*Klh1l7wkoG6PDPb9A5oCHQ.png" width="150">  

Frontend du projet Angular 17 pour les étudiants du Master MIAGE Madagascar 2024.

Lien du projet Back - End Node JS : [Assignment Backend Node](https://github.com/Junx2001/MBDSNode)


## Contributeurs

### [Rafamantanantsoa Rotsy Vonimanitra](https://github.com/rotsyrotsy)
### [Ratsirarson Joharisoa](https://github.com/Junx2001)

## Présentation
Le projet AssignmentApp est une application Angular - NodeJS, gérant les devoirs des étudiants d'une école.
Chaque étudiant a un compte sur l'application, lui permettant d'y déposer ses devoirs afin que le professeur
correspondant le note et le rende. Chaque professeur joue le rôle d'administrateur, qui ajoute leurs matières
sur le système, note les devoirs, donne des remarques et les rendent.

La partie frontend du projet montre le flux des devoirs dans le système.
Nous avons effectué plusieurs tâches et les avons réparties par module frontend et backend.

## Installation et lancement
1. Clonez ce repository sur votre machine locale
`git clone https://github.com/rotsyrotsy/AngularMBDS.git`

2. Installez node (21.1.0) et npm depuis [https://nodejs.org/en/download/prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer)

3. Installez Angular 17
`npm install -g @angular/cli@17`

4. Placez-vous à la racine du projet et lancez les commandes suivantes
```sh
npm install
ng serve
```

Ces commandes construisent l'application et lancent un serveur de développement. Vous pouvez accéder à l'application dans votre navigateur en allant à l'adresse `http://localhost:4200`.

5. Pour build l'application en production
```sh
ng build
```
Cette commande va créer le répertoire `dist` avec tous les fichiers compilés.  

## Contribution

### Travail fait

* Ajout d'une ToolBar et d'un Sidenav dans le layout global de toutes les pages
 
* Ajout d'une gestion de login/password : authentification à l'aide de JSON Web Tokens (JWT)
![Alt text](/screenshots/login.png?raw=true "login")
     
* Comme dans le TP on gérera le cas particulier admin (qui lui seul peut faire EDIT et DELETE des assignments).
![Alt text](/screenshots/show1.png?raw=true "show")

* Ajouter de nouvelles propriétés au modèle des Assignments (auteur, matière, note, remarque)

* Améliorer l'affichage des Assignments
1. Afficher dans la liste des Assignments chaque Assignment sous forme d'une Material Card
![Alt text](/screenshots/2.png?raw=true "Material cards")

2. La vue détails montrera en plus les remarques, la note s'il a été rendu, l'auteur, la matière, le professeur, etc.
![Alt text](/screenshots/show.png?raw=true "show")

3. Les formulaires d'ajout et de détails proposeront un choix fixe de matières (et associeront automatiquement le prof et l'image illustrant la matière)
![Alt text](/screenshots/add2.png?raw=true "add assignments with subject")

* Afficher les Assignments dans deux onglets séparés selon qu'ils ont été rendus ou pas encore rendus avec drag'n'drop pour passer d'un état à l'autre.
![Alt text](/screenshots/dragdrop2.png?raw=true "drag & drop avant le rendu")
![Alt text](/screenshots/dragdrop.png?raw=true "drag & drop")
     

* Utiliser un Formulaire de type Stepper pour l'ajout d'Assignments (éventuellement pour la modification)
![Alt text](/screenshots/3.png?raw=true "stepper")

* Ajout de messages de notification (SnackBar Material)
![Alt text](/screenshots/notif.png?raw=true "Snackbar Material")

* Collection d'élèves et de profs pour faciliter l'association devoir/élève et matières/profs

* Hébergement sur [https://angular-mbds-assignment.vercel.app](https://angular-mbds-assignment.vercel.app/home)

### Atouts apportés
* Affichage d'un spinner lors du chargement des pages
![Alt text](/screenshots/loading.gif?raw=true "loading")

* Page d'inscription avec formulaire de type Stepper
![Alt text](/screenshots/register.png?raw=true "inscription")

* Page de liste des matières
![Alt text](/screenshots/matieres.png?raw=true "matières")

* Ajout d'une nouvelle matière (cas particulier pour l'admin)
![Alt text](/screenshots/ajout-matiere.png?raw=true "ajout matière")

* Gestion des utilisateurs
1. Ajout de photo de profil pour les utilisateurs

2. Profil utilisateur avec possibilité de modification des données
![Alt text](/screenshots/profil.png?raw=true "profil")

* Intégration de l'élément accordion pour l'affichage de la liste des assignments (en bas) et la zone de drag n drop (en haut)
![Alt text](/screenshots/accordion1.png?raw=true "Accordion expanded for assignment list")
![Alt text](/screenshots/accordion2.png?raw=true "Accordion expanded for assignment state")

* 404 Page Not Found quand une référence n'existe pas
![Alt text](/screenshots/404.png?raw=true "page not found")

