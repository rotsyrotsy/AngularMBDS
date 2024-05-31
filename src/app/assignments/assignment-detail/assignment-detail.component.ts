import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentFK } from '../assignment_fk.model';
import { GlobalConstants } from '../../shared/global-constants';
import { DialogDeleteAssignmentComponent } from '../dialog-delete-assignment/dialog-delete-assignment.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    MatIconModule,
    MatGridListModule,
    RouterOutlet,
    RouterLink,
    MatCardModule,
    CommonModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css',
})
export class AssignmentDetailComponent {
  assignmentTransmis!: AssignmentFK | undefined;
  defaultImage = GlobalConstants.defaultImage;
  isAdmin = false;
  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    public dialog: MatDialog,
    private authService : AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.globalService.setLoading(true);
    this.assignmentsService.getAssignment(id).subscribe((response) => {
      if (response.success) {
        this.assignmentTransmis = response.data[0];
      } else {
        this.globalService.openSnackBar(response.error ?? response.message, '', [
          'danger-snackbar',
        ]);
        this.router.navigate(['/pageNotFound'], { skipLocationChange: true });
    }
      this.globalService.setLoading(false);
    });
    this.authService.isAdmin()
    .then((admin)=>{
        if(admin){
          this.isAdmin = true;
        }
      }
    );
  }
  getColorRendu(a: any) {
    return a.rendu ? 'green' : 'red';
  }
  onAssignmentRendu() {
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentsService
        .updateAssignment(this.assignmentTransmis._id!, this.assignmentTransmis)
        .subscribe((response) => {
          if (response.success) {
            let message = "Devoir rendu avec succès.";
            this.globalService.openSnackBar(message, '', [
              'success-snackbar',
            ]);
          } else {
            this.globalService.openSnackBar(response.error, '', [
              'danger-snackbar',
            ]);
          }
        });
    }
  }
  onDeleteAssignment() {
    if (this.assignmentTransmis && this.isAdmin) {
      this.dialog.open(DialogDeleteAssignmentComponent, {
        width: '250px',
        data: {
          assignment: this.assignmentTransmis,
          callbackFunction: () => {
            this.router.navigate(['/home']);
          } 
        },
      });
    }else{
      this.globalService.openSnackBar("Vous n'avez pas la permission requise pour cette action.", '', [
        'danger-snackbar',
      ]);
    }
  }
}
