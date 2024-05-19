import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

export const authAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);

  return authService.isAdmin()
  .then((admin)=>{
      if(!admin){
        console.log("ADMIN GUARD : navigation non autorisee");
        globalService.openSnackBar("Vous ne pouvez pas accéder à cette page.", '', [
          'danger-snackbar',
        ]);
        return false;
      }else{
        console.log("ADMIN GUARD : navigation autorisee");
        return true;
      }
    }
  );

};
