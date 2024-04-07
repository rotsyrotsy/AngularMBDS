import { Component, Inject, Output } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentFK } from '../assignment_fk.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { GlobalService } from '../../shared/global.service';
import { Router } from '@angular/router';
import { AssignmentsComponent } from '../assignments.component';

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
    private router: Router,
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
          this.data.callbackFunction();
          this.router.navigate(['/home']);
        } else {
          this.globalService.openSnackBar(response.error, '', [
            'danger-snackbar',
          ]);
        }
      });
  }
}
