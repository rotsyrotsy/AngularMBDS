import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule,ReactiveFormsModule,Validators } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink, } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { GlobalService } from '../../shared/global.service';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';


@Component({
  selector: 'app-signup-component',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule,CommonModule, FormsModule, MatIconModule,MatSelectModule,ReactiveFormsModule,
    MatInputModule,MatFormFieldModule,MatButtonModule,ReactiveFormsModule,RouterLink,MatStepperModule,
    MatProgressBarModule, MatToolbarModule],
  templateUrl: './signup-component.component.html',
  styleUrl: './signup-component.component.css'
})
export class SignupComponentComponent {
  hide=true;
  email='';
  password='';
  name='';
  roles: String[] = ['ROLE_USER_STUDENT', 'ROLE_USER_PROFESSOR'];
  picture='';
  passwordFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });
  isLinear = false;

  currentFile?: File;
  progress = 0;
  message = '';

  fileName = 'Select file';
  fileInfos?: Observable<any>;

  constructor(private router:Router,
    private authService: AuthService,
    private globalService:GlobalService,
    private _formBuilder: FormBuilder){}

    selectFile(event: any): void {
      this.progress = 0;
      this.message = "";
  
      if (event.target.files && event.target.files[0]) {
        const file: File = event.target.files[0];
        this.currentFile = file;
        this.fileName = this.currentFile.name;
      } else {
        this.fileName = 'Select file';
      }
    }
  
    upload(): void {
      if (this.currentFile) {
        // this.uploadService.upload(this.currentFile).subscribe({
        //   next: (event: any) => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //       this.progress = Math.round(100 * event.loaded / event.total);
        //     } else if (event instanceof HttpResponse) {
        //       this.message = event.body.message;
        //       this.fileInfos = this.uploadService.getFiles();
        //     }
        //   },
        //   error: (err: any) => {
        //     console.log(err);
        //     this.progress = 0;
  
        //     if (err.error && err.error.message) {
        //       this.message = err.error.message;
        //     } else {
        //       this.message = 'Could not upload the file!';
        //     }
        //   },
        //   complete: () => {
        //     this.currentFile = undefined;
        //   }
        // });
      }
    }
}
