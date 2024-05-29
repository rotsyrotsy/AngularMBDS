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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-drag-drop-assignments',
  standalone: true,
  imports: [CdkDropList, CdkDrag,MatCardModule, CommonModule, DialogModule,MatPaginatorModule],
  templateUrl: './drag-drop-assignments.component.html',
  styleUrl: './drag-drop-assignments.component.css'
})
export class DragDropAssignmentsComponent {
  nonRendus : AssignmentFK[] = [];
  rendus: any = [];

  page = 1;
  limit = 5;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(
    private assignmentsService: AssignmentsService,
    private globalService: GlobalService,
    public dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.getAssignmentNonRendusFromService();
  }
  getColorRendu(a: any) {
    return a.rendu ? 'green' : 'red';
  }
  getAssignmentNonRendusFromService(loading=true, params:any = {'rendu':false}) {
    if(loading) this.globalService.setLoading(true);
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit, params)
      .subscribe((data) => {
        if (data.success) {
          data = data.data;
          this.nonRendus = data.docs;
          this.page = data.page;
          this.limit = data.limit;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.nextPage = data.nextPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.hasPrevPage = data.hasPrevPage;
          this.globalService.closeSnackBar();
        } else {
          this.globalService.openSnackBar(data.error ? data.error : data.message, '', ['danger-snackbar']);
        }
        if(loading) this.globalService.setLoading(false);
      });
  }
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentNonRendusFromService();
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
          callbackFunction: (note:number) => {
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );
            event.container.data[event.currentIndex].note = note+"/20";
          },
          callbackFunction2: () => {
            this.getAssignmentNonRendusFromService(false);
            this.assignmentsService.reloadAssignmentListComponent();
          },
        },
      });
      
    }
  }
}
