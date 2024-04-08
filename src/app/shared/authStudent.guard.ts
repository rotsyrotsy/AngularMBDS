import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { GlobalService } from './global.service';

export const authStudentGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const globalService = inject(GlobalService);

  return authService.isAdmin()
  .then((admin)=>{
      if(admin){
        console.log("STUDENT GUARD : navigation non autorisee");
        globalService.openSnackBar("Vous ne pouvez pas accéder à cette page.", '', [
          'danger-snackbar',
        ]);
        return false;
      }else{
        console.log("STUDENT GUARD : navigation autorisee");
        return true;
      }
    }
  );
  
};
