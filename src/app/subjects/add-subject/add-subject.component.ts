import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubjectsService } from '../../shared/subjects.service';
import { GlobalService } from '../../shared/global.service';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-subject',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-subject.component.html',
  styleUrl: './add-subject.component.css'
})
export class AddSubjectComponent {
  name ='';
  currentFile?: any;
  progress = 0;
  preview = '';
  fileName = 'Select file';
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<AddSubjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private subjectService: SubjectsService,
    private globalService : GlobalService,
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
  addNewSubject(){
    const formdata = new FormData();
    formdata.append('name',this.name);
    formdata.append('file',this.currentFile);
    this.loading = true;
    this.subjectService.addSubject(formdata).subscribe((response) => {
      if (response.success) {
        this.globalService.closeSnackBar();
        let message = "Nouvelle matière enregistrée."
        this.globalService.openSnackBar(message, '', [
          'success-snackbar',
        ]);
        this.data.callbackFunction();
        this.resetForm();
        this.dialogRef.close();
      } else {
        this.globalService.closeSnackBar();
        this.globalService.openSnackBar(response.message, '', [
          'danger-snackbar',
        ]);
      }
      this.loading = false;
    });
  }
  resetForm(){
    this.name = '';
    this.loading = false;
    this.currentFile = undefined;
    this.progress = 0;
    this.preview = '';
    this.fileName = 'Select file';
  }
}
