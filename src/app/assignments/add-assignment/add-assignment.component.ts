import { Component } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from '../../subjects/subject.model';
import { User } from '../../users/user.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  subjects: Subject[] = [
    {
      _id: '0',
      name: 'Big Data',
      picture: 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      professor_id: '0',
    },
    {
      _id: '1',
      name: 'Angular',
      picture: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      professor_id: '1',
    },
  ];

  users: User[] = [
    {
      _id: '0',
      name: 'Mopolo',
      email: 'test@gmail.com',
      password: 'password',
      role: 'ROLE_USER_PROFESSOR',
      picture:
        'https://upload.wikimedia.org/wikipedia/en/d/d5/Professor_%28Money_Heist%29.jpg',
      active: 0,
    },
    {
      _id: '1',
      name: 'Buffa',
      email: 'test2@gmail.com',
      password: 'password',
      role: 'ROLE_USER_PROFESSOR',
      picture:
        'https://www.superprof.ca/blog/wp-content/uploads/2022/07/pexels-rodnae-productions-7092613.jpg',
      active: 0,
    },
  ];
  subjectControl = new FormControl<Subject | null>(null, Validators.required);

  //champs du formulaire
  nomAssignment = '';
  dateDeRendu = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private globalService: GlobalService,
    private _formBuilder: FormBuilder
  ) {}

  onSubmit(event: any) {
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService
      .addAssignment(newAssignment)
      .subscribe((response) => {
        if (response.success) {
          this.globalService.openSnackBar(response.message, '', [
            'success-snackbar',
          ]);
        } else {
          this.globalService.openSnackBar(response.error, '', [
            'danger-snackbar',
          ]);
        }
      });
  }
  getUser(id: string): User | undefined {
    return this.users.find((user) => user._id === id);
  }
}
