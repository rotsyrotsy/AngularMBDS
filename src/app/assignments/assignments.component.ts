import { Component } from '@angular/core';
import { RenduDirective } from '../shared/rendu.directive';
import { Assignment } from './assignment.model';
import {provideNativeDateAdapter} from '@angular/material/core';
import { AssignmentDetailComponent } from './assignment-detail/assignment-detail.component';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { AddAssignmentComponent } from './add-assignment/add-assignment.component';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatButtonModule,RenduDirective,AssignmentDetailComponent,
    MatListModule,CommonModule, AddAssignmentComponent],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  formVisible=false;
  // Memorisation de l'assignment clique
  assignmentSelectionne:Assignment | undefined;

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
  assignementSelected(a:Assignment){
    this.assignmentSelectionne = a;
  }
  onAddAssignmentClick(){
    this.formVisible=true;
  }
  ajouteAssignment(event:Assignment){
    this.assignmentsService.addAssignment(event)
    .subscribe((reponse)=>{
      console.log(reponse);
      this.formVisible = false;
    });
  }
  supprimerAssignment(){
    if(this.assignmentSelectionne){
      const index = this.assignements.indexOf(this.assignmentSelectionne);
      if (index > -1) { 
        this.assignements.splice(index, 1); 
        this.assignmentSelectionne = undefined;
      }
    }
  }
}
