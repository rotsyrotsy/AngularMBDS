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
  password=undefined;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);

  constructor(private router:Router){}

  onLogin(event:any){
    this.router.navigate(['/home']);
  }
}
