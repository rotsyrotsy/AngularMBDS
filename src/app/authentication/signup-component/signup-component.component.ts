import { Component } from '@angular/core';
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
import { MatSelectModule } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-signup-component',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false },
    },
  ],
  imports: [
    MatCardModule,
    CommonModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterLink,
    MatStepperModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './signup-component.component.html',
  styleUrl: './signup-component.component.css',
})
export class SignupComponentComponent {
  passwordFormControl = new FormControl<string|null>(null, [Validators.required]);
  emailFormControl = new FormControl<string|null>(null, [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl<string|null>(null, [Validators.required]);
  roles: string[] = ['ROLE_USER_STUDENT', 'ROLE_USER_PROFESSOR'];
  hidePassword = true;
  
  selectedRole = this.roles[0];
  loading = false;
  currentFile?: any;
  progress = 0;
  preview = '';
  fileName = 'Select file';

  constructor(
    private authService: AuthService,
    private globalService: GlobalService
  ) {}

  selectFile(event: any): void {
    this.progress = 0;
    if (event.target.files && event.target.files[0]) {
      this.currentFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload=(e:any)=>{
        this.preview = e.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select file';
    }
  }
  onSignup(stepper: MatStepper) {
    if (this.nameFormControl.value == undefined || this.emailFormControl.value == undefined || this.passwordFormControl.value === undefined) return;
    if (this.nameFormControl.value == '' || this.emailFormControl.value == '' || this.passwordFormControl.value === '') return;

    const formdata = new FormData();
    formdata.append('name',this.nameFormControl.value!);
    formdata.append('password',this.passwordFormControl.value!);
    formdata.append('email',this.emailFormControl.value!);
    formdata.append('role',this.selectedRole);
    formdata.append('file',this.currentFile);
    this.loading = true;

    this.authService.register(formdata).subscribe((response) => {
      if (response.success) {
        this.globalService.closeSnackBar();
        let message = "Votre compte a bien été enregistré.";
        this.globalService.openSnackBar(response.message, '', [
          'success-snackbar',
        ]);

        this.resetForm();
      } else {
        this.globalService.closeSnackBar();
        this.globalService.openSnackBar(response.message, '', [
          'danger-snackbar',
        ]);
      }
      this.loading = false;
      stepper.reset();
    });
  }
  resetForm(){
    this.emailFormControl.reset();
    this.passwordFormControl.reset();
    this.nameFormControl.reset();
    this.selectedRole = this.roles[0];
    this.loading = false;
    this.currentFile = undefined;
    this.progress = 0;
    this.preview = '';
    this.fileName = 'Select file';
  }
}