import { Component } from '@angular/core';
import { User } from './user.model';
import { GlobalConstants } from '../shared/global-constants';
import { AuthService } from '../shared/auth.service';
import { GlobalService } from '../shared/global.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-users',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent {
  user!: User | undefined;
  defaultImage = GlobalConstants.defaultImage;
  hide = true;
  emailFormControl = new FormControl<string|undefined>(undefined, [Validators.email]);
  currentFile?: any;
  preview = '';
  fileName = 'Changer la photo';
  name: string | undefined = '';
  passwordConfirmationFormControl = new FormControl<string | null>(null);
  newPasswordFormControl = new FormControl<string | null>(null);

  constructor(
    private globalService: GlobalService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCurrentUserFromService();
  }
  getCurrentUserFromService(loading = true) {
    if(loading) this.globalService.setLoading(true);
    this.authService.getCurrentUser().subscribe((response) => {
      if (response.success) {
        this.user = response.data.user;
        this.emailFormControl.setValue(this.user?.email);
        this.name = this.user?.name;
      } else {
        this.globalService.openSnackBar(response.error, '', [
          'danger-snackbar',
        ]);
      }
      if(loading) this.globalService.setLoading(false);
    });
  }
  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.currentFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.preview = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Changer la photo';
    }
  }
  updateProfile() {
    if (this.emailFormControl.value == undefined || this.emailFormControl.value == '') return;

    const formdata = new FormData();
    if (this.user !== undefined) {
      if(this.user.name!=this.name) formdata.append('name', this.name!);
      if(this.currentFile!=undefined) formdata.append('file', this.currentFile);
      if(this.user.email!=this.emailFormControl.value!) formdata.append('email', this.emailFormControl.value!);
    }
    if (this.newPasswordFormControl.value !== undefined && this.newPasswordFormControl.value !== "") {      
      if (this.passwordConfirmationFormControl.value === undefined) return;
      if(this.newPasswordFormControl.value! === this.passwordConfirmationFormControl.value! ){
        formdata.append('password', this.newPasswordFormControl.value!);
      }else{
        this.globalService.closeSnackBar();
        this.globalService.openSnackBar("Le nouveau mot de passe n'est pas confirmé", '', [
          'danger-snackbar',
        ]);
        return;
      }
    };

    this.globalService.setLoading(true);
    this.authService.updateUser(formdata).subscribe((response) => {
      if (response.success) {
        this.globalService.closeSnackBar();
        let message = "Les modifications sur votre compte ont été enregistré."
        this.globalService.openSnackBar(message, '', [
          'success-snackbar',
        ]);
        this.getCurrentUserFromService(false);
        this.authService.setUserSubject(response.data.user);
      } else {
        this.globalService.closeSnackBar();
        this.globalService.openSnackBar(response.message, '', [
          'danger-snackbar',
        ]);
      }
      this.globalService.setLoading(false);
    });
  }
}
