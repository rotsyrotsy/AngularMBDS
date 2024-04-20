import { Component} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { GlobalService } from '../../shared/global.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-component',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressSpinnerModule,
  ],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css',
})
export class LoginComponentComponent {
  hide = true;
  emailFormControl = new FormControl<string | null>(null, [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl<string | null>(null, [Validators.required]);
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private globalService: GlobalService,
  ) {}

  onLogin() {
    this.loading = true;
    if (this.emailFormControl.value == undefined || this.passwordFormControl.value === undefined) return;
    if (this.emailFormControl.value == '' || this.passwordFormControl.value === '') return;

    this.authService.login(this.emailFormControl.value!, this.passwordFormControl.value!).subscribe((response) => {
      if (response.success) {
        if (typeof response.data.token == 'string') {
          localStorage.setItem('token', response.data.token);
        }
        this.loading = false;
        this.globalService.closeSnackBar();
        this.router.navigate(['/home']);
      } else {
        this.globalService.openSnackBar(response.message, '', [
          'danger-snackbar',
        ]);
      }
    });
  }
}
