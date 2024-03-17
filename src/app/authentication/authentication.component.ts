import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-authentication',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule,CommonModule, FormsModule, MatIconModule,
    MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent {
  hide=true;
  email='';
  password='';
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private router:Router,
    private authService: AuthService,
    private globalService:GlobalService){}

  onLogin(event:any){
    this.authService.login(this.email, this.password)
    .subscribe(
      (response)=>{
        if(response.success){
          if(typeof(response.data.token)=='string'){
            localStorage.setItem('token',response.data.token);
          }
          this.globalService.closeSnackBar();
          this.router.navigate(['/home']);
        }else{
          this.globalService.openSnackBar(response.message,'',['danger-snackbar']);
        }
      });
  }
}
