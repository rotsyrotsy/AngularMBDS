import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignements: Assignment[] =[]
  uri = 'http://localhost:8010/api/assignments';
  // uri = 'https://angularmbdsback.onrender.com/api/assignments';

  constructor(private logService:LoggingService,
    private http:HttpClient) {}


  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.uri);
  }
  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit);
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
  // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  peuplerBD() {
    // on utilise les données de test générées avec mockaroo.com pour peupler la base
    // de données
    bdInitialAssignments.forEach(a => {
      let nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      this.addAssignment(nouvelAssignment)
      .subscribe(() => {
        console.log("Assignment " + a.nom + " ajouté");
      });
    });
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });

    return forkJoin(appelsVersAddAssignment);
  }

}
