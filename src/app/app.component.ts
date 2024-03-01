import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';
import { AssignmentsService } from './shared/assignments.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSlideToggleModule,RouterOutlet, AssignmentsComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des devoirs';
  constructor(private authService : AuthService,
    private router:Router,
    private assignmentsService : AssignmentsService){}

  login(){
    console.log(this.authService.loggedIn);
    
    if(!this.authService.loggedIn){
      this.authService.logIn();
    }else{
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }
  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */

    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });
  }
}
