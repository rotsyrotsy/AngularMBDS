import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AuthService } from './shared/auth.service';

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
    private router:Router){}

  login(){
    console.log(this.authService.loggedIn);
    
    if(!this.authService.loggedIn){
      this.authService.logIn();
    }else{
      this.authService.logOut();
      this.router.navigate(["/home"]);
    }
  }
}
