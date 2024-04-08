import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);

  return authService.isAdmin()
  .then((admin)=>{
      if(admin){
        console.log("GUARD : navigation autorisee");
        return true;
      }else{
        console.log("GUARD : navigation non autorisee");
        globalService.openSnackBar("Vous ne pouvez pas accéder à cette page.", '', [
          'danger-snackbar',
        ]);
        return false;
      }
    }
  );
  
};
