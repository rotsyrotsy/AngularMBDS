import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { GlobalConstants } from '../../shared/global-constants';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Assignment } from '../assignment.model';
import { AssignmentFK } from '../assignment_fk.model';
import { SubjectProfessor } from '../../subjects/subject_professor.model';
import { SubjectsService } from '../../shared/subjects.service';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent {
  assignment: AssignmentFK | undefined;
  subjects: SubjectProfessor[] = [];
  subjectControl = new FormControl<SubjectProfessor | undefined>(
    undefined
  );

  nomAssignment = '';
  dateDeRendu?: Date = undefined;
  defaultImage = GlobalConstants.defaultImage;
  noteAssignment = '';
  remarqueAssignment = '';
  renduAssignment = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private subjectsService: SubjectsService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    this.globalService.setLoading(true);

    this.subjectsService.getAllSubjectsNoPagination().subscribe((data) => {
      if (data.success) {
        data = data.data;
        this.subjects = data.docs;
        this.globalService.closeSnackBar();

        // get the assignment
        this.assignmentsService.getAssignment(id).subscribe((response) => {
          if (response.success) {
            this.assignment = response.data[0];
    
            if (this.assignment !== undefined) {
              this.nomAssignment = this.assignment.nom;
              this.dateDeRendu =
                typeof this.assignment.dateDeRendu === 'string'
                  ? new Date(this.assignment.dateDeRendu)
                  : this.assignment.dateDeRendu;
              this.noteAssignment = this.assignment.note;
              this.remarqueAssignment = this.assignment.remarque;
              this.renduAssignment = this.assignment.rendu;
                
              const selectedSubject: SubjectProfessor | undefined = this.subjects.find(subject=>subject._id === this.assignment?.subject?._id);
              this.subjectControl.setValue(selectedSubject);
              
            }
          } else {
            this.globalService.openSnackBar(response.error, '', [
              'danger-snackbar',
            ]);
          }    
          this.globalService.setLoading(false);
        });
      } else {
        this.globalService.openSnackBar(data.error, '', [
          'danger-snackbar',
        ]);
      }
    });
  }

  onSaveAssignment() {
    if (!this.assignment) return;
    if (
      this.nomAssignment == '' ||
      this.subjectControl.value?._id === undefined
    )
      return;

    // on récupère les valeurs dans le formulaire
    let updateAssignment = new Assignment();
    updateAssignment.note =this.noteAssignment;
    updateAssignment.remarque=this.remarqueAssignment  ;
    updateAssignment.rendu = this.renduAssignment ;

    this.assignmentsService
      .updateAssignment(this.assignment._id!, updateAssignment)
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
