import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GlobalService } from '../../shared/global.service';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { SubjectsService } from '../../shared/subjects.service';
import { SubjectProfessor } from '../../subjects/subject_professor.model';
import moment from 'moment';
import { GlobalConstants } from '../../shared/global-constants';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [
    provideNativeDateAdapter(),
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  subjects: SubjectProfessor[] = [];
  subjectControl = new FormControl<SubjectProfessor | null>(null, Validators.required);
  nomFormControl = new FormControl<string | null>(null, [Validators.required]);

  //champs du formulaire
  dateDeRendu = undefined;
  defaultImage = GlobalConstants.defaultImage;
  loading=false;

  constructor(
    private assignmentsService: AssignmentsService,
    private subjectsService: SubjectsService,
    private globalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.globalService.setLoading(true);
    this.subjectsService
      .getAllSubjectsNoPagination()
      .subscribe((data) => {
        if (data.success) {
          this.subjects = data.data;
          this.globalService.closeSnackBar();
        } else {
          this.globalService.openSnackBar(data.error ? data.error : data.message, '', ['danger-snackbar']);
        }
        this.globalService.setLoading(false);
      });
  }

  onSubmit() {
    this.loading = true;
    if (this.nomFormControl.value == undefined || this.subjectControl.value?._id === undefined) return;
    if (this.nomFormControl.value == '' || this.subjectControl.value?._id === '') return;

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomFormControl.value!;
    newAssignment.rendu = false;
    newAssignment.subject_id = this.subjectControl.value._id;
    if(this.dateDeRendu !== undefined){
      newAssignment.dateDeRendu = moment(this.dateDeRendu).format('YYYY-MM-DD');
    }
    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((response) => {
        if (response.success) {
          this.globalService.openSnackBar(response.message, '', [
            'success-snackbar',
          ]);
        } else {
          this.globalService.openSnackBar(response.message, '', [
            'danger-snackbar',
          ]);
        }
        this.loading = false;
      });
  }
}