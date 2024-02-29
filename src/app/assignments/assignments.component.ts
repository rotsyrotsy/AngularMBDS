import { Component } from '@angular/core';
import { RenduDirective } from '../shared/rendu.directive';
import { Assignment } from './assignment.model';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatButtonModule,RenduDirective,AssignmentDetailComponent,
    MatListModule,CommonModule, AddAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  assignements: Assignment[] =[]

  constructor(private assignmentsService:AssignmentsService){}

  getColor(a:any){
    return a.rendu ? 'green' : 'red';
  }
  ngOnInit(): void {
  //   setTimeout(()=>{
  //     this.boutonActive = true;
  //   },3000)
    this.getAssignmentFromService();
  }
  getAssignmentFromService(){
    this.assignmentsService.getAssignments()
    .subscribe((assignments)=>{
      console.log("avant");
      this.assignements = assignments;
    });
    console.log("apres");
  }
}
