import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import { AuthService } from '../shared/auth.service';
import { AssignmentsService } from '../shared/assignments.service';
import { GlobalService } from '../shared/global.service';
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule,MatSlideToggleModule,RouterOutlet, RouterLink,
    MatListModule,MatSidenavModule,MatToolbarModule, MatButtonModule, MatIconModule,MatMenuModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  title = 'Application de gestion des devoirs';
  isCollapsed = true;
  navigation: {[key:string]: string}[]=[]


  constructor(private authService : AuthService,
    private router:Router,
    private assignmentsService : AssignmentsService,
    private globalService: GlobalService){}

  ngOnInit(): void {
    this.globalService.closeSnackBar();
    this.navigation.push(
      {icon:'home',label:'Accueil',url:'/home'},
      {icon:'list',label:'Les devoirs',url:'/home'},
      {icon:'add',label:'Ajouter un devoir',url:'/add'},
    );
  }
  logout(){
      this.authService.logOut();
      this.router.navigate(["/auth/login"]);
  }
  genererDonneesDeTest() {
    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
      window.location.reload();
    });
  }
}
