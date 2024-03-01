import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignements: Assignment[] =[]
  uri = 'http://localhost:8010/api/assignments';

  constructor(private logService:LoggingService,
    private http:HttpClient) {}


  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri);
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
