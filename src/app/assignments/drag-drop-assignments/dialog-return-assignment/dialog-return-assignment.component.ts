import { Component, Inject } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Assignment } from '../../assignment.model';
import { AssignmentsService } from '../../../shared/assignments.service';
import { GlobalService } from '../../../shared/global.service';
import {  MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-return-assignment',
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
  ],
  templateUrl: './dialog-return-assignment.component.html',
  styleUrl: './dialog-return-assignment.component.css',
})
export class DialogReturnAssignmentComponent {
  noteAssignment = '';
  remarqueAssignment = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentsService: AssignmentsService,
    private globalService : GlobalService,
  ) {}
  onRenduAssignment() {
    if (this.noteAssignment === '' || isNaN(parseInt(this.noteAssignment))){
      this.globalService.openSnackBar("Entrez une note valide", '', [
        'danger-snackbar',
      ]);
      return;
    } 

    // on récupère les valeurs dans le formulaire
    let updateAssignment = new Assignment();
    updateAssignment.note = this.noteAssignment;
    updateAssignment.remarque = this.remarqueAssignment;
    updateAssignment.rendu = true;
    this.data.callbackFunction();

    this.assignmentsService
      .updateAssignment(this.data.assignment._id!, updateAssignment)
      .subscribe((response) => {
        if (response.success) {
          // this.data.callbackFunction();
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
