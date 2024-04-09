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
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  subjects: SubjectProfessor[] = [];
  subjectControl = new FormControl<SubjectProfessor | null>(null, Validators.required);
  nomFormControl = new FormControl('', [Validators.required]);

  //champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;

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
          data = data.data;
          this.subjects = data.docs;
          this.globalService.closeSnackBar();
        } else {
          this.globalService.openSnackBar(data.error, '', ['danger-snackbar']);
        }
        this.globalService.setLoading(false);
      });
  }

  onSubmit() {
    if (this.nomAssignment == '' || this.subjectControl.value?._id === undefined) return;

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomAssignment;
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
      });
  }
}
