import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
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
    ReactiveFormsModule,
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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  passwordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  nameFormControl = new FormControl('', [Validators.required]);
  roles: String[] = ['ROLE_USER_STUDENT', 'ROLE_USER_PROFESSOR'];
  hidePassword = true;
  email = '';
  password = '';
  name = '';
  selectedRole = this.roles[0];
  loading = false;
  currentFile?: File;
  progress = 0;
  preview = '';
  fileName = 'Select file';

  constructor(
    private authService: AuthService,
    private globalService: GlobalService,
    private _formBuilder: FormBuilder
  ) {}

  selectFile(event: any): void {
    this.progress = 0;
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      const reader = new FileReader();
      reader.onload=(e:any)=>{
        console.log(e.target.result);
        this.preview = e.target.result;
      }
      reader.readAsDataURL(this.currentFile);
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select file';
    }
  }
  onSignup(stepper: MatStepper) {
    const params = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.selectedRole,
      file: this.currentFile,
    };
    console.log(params);
    this.loading = true;
    this.authService.register(params).subscribe((response) => {
      if (response.success) {
        this.globalService.closeSnackBar();
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
    this.email = '';
    this.password = '';
    this.name = '';
    this.selectedRole = this.roles[0];
    this.loading = false;
    this.currentFile = undefined;
    this.progress = 0;
    this.preview = '';
    this.fileName = 'Select file';
  }
}
