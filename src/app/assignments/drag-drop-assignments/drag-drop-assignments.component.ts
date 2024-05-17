import { Component, Input } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { AssignmentFK } from '../assignment_fk.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { GlobalService } from '../../shared/global.service';
import { CommonModule } from '@angular/common';
import {  DialogModule } from '@angular/cdk/dialog';
import { DialogReturnAssignmentComponent } from './dialog-return-assignment/dialog-return-assignment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-drag-drop-assignments',
  standalone: true,
  imports: [CdkDropList, CdkDrag,MatCardModule, CommonModule, DialogModule],
  templateUrl: './drag-drop-assignments.component.html',
  styleUrl: './drag-drop-assignments.component.css'
})
export class DragDropAssignmentsComponent {
  nonRendus : AssignmentFK[] = [];
  rendus: any = [];


  constructor(
    private assignmentsService: AssignmentsService,
    private globalService: GlobalService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.globalService.setLoading(true);
    this.assignmentsService
    .getAssignmentsNoPagination({'rendu':false})
      .subscribe((data) => {
        if (data.success) {
          this.nonRendus = data.data;
          this.globalService.closeSnackBar();
        } else {
          this.globalService.openSnackBar(data.error, '', ['danger-snackbar']);
        }
        this.globalService.setLoading(false);
      });
  }
  getColorRendu(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let assignment = event.previousContainer.data[event.previousIndex];
      this.dialog.open(DialogReturnAssignmentComponent, {
        minWidth: '500px',
        data: {
          assignment: assignment,
          callbackFunction: () => {
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );
          },
        },
      });
      
    }
  }
}
