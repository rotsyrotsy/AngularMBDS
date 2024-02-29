import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAdmin()
  .then((admin)=>{
      if(admin){
        console.log("GUARD : navigation autorisee");
        
        return true;
      }else{
        console.log("GUARD : navigation non autorisee");
        router.navigate(['/home']);
        return false;
      }
    }
  );
  
};
