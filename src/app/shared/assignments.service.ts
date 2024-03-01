import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, map, of, tap } from 'rxjs';
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
  addAssignment(assignment:Assignment):Observable<any>{
    this.logService.log(assignment.nom, "ajoute");
    return this.http.post<Assignment>(this.uri, assignment);

    // this.assignements.push(assignment);
    // return of("Assignment ajoute avec succes");
  }
  updateAssignment(assignment:Assignment):Observable<any>{
    this.logService.log(assignment.nom, "modifie");
    return this.http.put<Assignment>(this.uri, assignment);

    // return of("Assignment modifie avec succes");
  }
  deleteAssignment(assignment:Assignment):Observable<any>{
    // const index = this.assignements.indexOf(assignment);
    // this.assignements.splice(index, 1);
    this.logService.log(assignment.nom, "supprime");
      // return of("assignment supprime avec succes");
      return this.http.delete(this.uri+"/"+assignment._id);

  }
  getAssignment(id:number):Observable<Assignment|undefined>{
    return this.http.get<Assignment>(this.uri+"/"+id)
    .pipe(
    //   map(a=>{
    //   a.nom += " MODIFIE PAR LE PIPE ";
    //   return a;
    // }),
    // tap(a=>{
    //   console.log("Dans le pipe avec "+a.nom);
    // }),
    catchError(
      this.handleError<Assignment>(`getAssignment(id=${id})`)
      )
    )

    // let a = this.assignements.find(a=>a.id === id);
    // return of(a);
  }
  private handleError<T>(operation: any, result?: T){
    return (error:any) : Observable<T> =>{
      console.log(error);
      console.log(operation+" a echoue "+error.message);
      return of(result as T);
    }
  }
}
