import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatButtonModule,MatCardModule,CommonModule,MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  assignmentTransmis!: Assignment|undefined;

  constructor(private assignmentsService:AssignmentsService,
    private route: ActivatedRoute,
    private router:Router){}

  ngOnInit():void{
    this.getAssignment();
  }
  getAssignment(){
    console.log(this.route.snapshot.queryParams);
    
    const id = this.route.snapshot.params['id'];
    
    this.assignmentsService.getAssignment(Number(id))
    .subscribe(assignment=>{
      this.assignmentTransmis = assignment
    });
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu=true;
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe((message)=>{
        console.log(message);
      })
      this.router.navigate(['/home']);
    }
  }
  onDeleteAssignment(){
    if(this.assignmentTransmis){
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse)=>{
        this.assignmentTransmis=undefined;
      })
    }
    this.router.navigate(['/home']);

  }
}
