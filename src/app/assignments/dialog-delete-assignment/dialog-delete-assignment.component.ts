import { Component, Inject, Output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-dialog-delete-assignment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-delete-assignment.component.html',
  styleUrl: './dialog-delete-assignment.component.css',
})
export class DialogDeleteAssignmentComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private assignmentsService: AssignmentsService,
    private globalService: GlobalService,
  ) {}
  onDelete() {
    this.assignmentsService
      .deleteAssignment(this.data.assignment)
      .subscribe((response) => {
        if (response.success) {
          this.data.assignement = undefined;
          this.globalService.openSnackBar(response.message, '', [
            'success-snackbar',
          ]);
          setTimeout(() => {
            this.data.callbackFunction();
          }, 500);
        } else {
          this.globalService.openSnackBar(response.error, '', [
            'danger-snackbar',
          ]);
        }
      });
  }
}
