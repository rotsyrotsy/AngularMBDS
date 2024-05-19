import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);
  const router = inject(Router);


  const loggedIn = authService.loggedIn;
    if (!loggedIn) {
      console.log("GUARD : navigation non autorisee , Utliisateur non connecté");
      globalService.openSnackBar("Vous devez être connecté pour accéder à cette page.", '', [
        'danger-snackbar',
      ]);
      router.navigate(['/auth/login']);
      return false;
    }
    console.log("GUARD : navigation autorisee, Utilisateur connecté");
    return true;


  }


