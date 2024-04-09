import { Component } from '@angular/core';
import { ListAssignmentsComponent } from './list-assignments/list-assignments.component';
import { DragDropAssignmentsComponent } from './drag-drop-assignments/drag-drop-assignments.component';
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [
    ListAssignmentsComponent,
    DragDropAssignmentsComponent,
  ],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css',
})
export class AssignmentsComponent {
  constructor() {}
}
