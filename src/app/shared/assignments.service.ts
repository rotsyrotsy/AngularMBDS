import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignements: Assignment[] =[{
    nom:"TP1 Angular Michel Buffa",
    dateDeRendu:new Date('2024-02-15'),
    rendu:false
  },{
    nom:"TP SQL3 de Serge Miranda",
    dateDeRendu:new Date ('2024-01-15'),
    rendu:true
  },{
    nom:"TP BD Mr Gabriel Mopolo",
    dateDeRendu:new Date ('2024-03-01'),
    rendu:false
  }]
  constructor() { 
  }
  getAssignments():Observable<Assignment[]>{
    return of(this.assignements);
  }
  addAssignment(assignment:Assignment):Observable<string>{
    this.assignements.push(assignment);
    return of("Assignment ajoute avec succes");
  }
  updateAssignment(assignment:Assignment):Observable<string>{
    return of("Assignment modifie avec succes");
  }
}
