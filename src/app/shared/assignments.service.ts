import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignements: Assignment[] =[{
    id:1,
    nom:"TP1 Angular Michel Buffa",
    dateDeRendu:new Date('2024-02-15'),
    rendu:false
  },{
    id:2,
    nom:"TP SQL3 de Serge Miranda",
    dateDeRendu:new Date ('2024-01-15'),
    rendu:true
  },{
    id:3,
    nom:"TP BD Mr Gabriel Mopolo",
    dateDeRendu:new Date ('2024-03-01'),
    rendu:false
  }]
  constructor(private logService:LoggingService) {}
  
  getAssignments():Observable<Assignment[]>{
    return of(this.assignements);
  }
  addAssignment(assignment:Assignment):Observable<string>{
    this.assignements.push(assignment);
    this.logService.log(assignment.nom, "ajoute");
    return of("Assignment ajoute avec succes");
  }
  updateAssignment(assignment:Assignment):Observable<string>{
    this.logService.log(assignment.nom, "modifie");
    return of("Assignment modifie avec succes");
  }
  deleteAssignment(assignment:Assignment):Observable<string>{
    const index = this.assignements.indexOf(assignment);
    this.assignements.splice(index, 1);
    this.logService.log(assignment.nom, "supprime");
      return of("assignment supprime avec succes");
  }
  getAssignment(id:number):Observable<Assignment|undefined>{
    let a = this.assignements.find(a=>a.id === id);
    return of(a);
  }
}
