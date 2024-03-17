import { Inject, Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin, map, of, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { GlobalConstants } from './global-constants';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignements: Assignment[] =[]
  uri = GlobalConstants.urlAPI+'/assignment';
  
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient,@Inject(DOCUMENT) private document: Document) {
      const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
        this.headers = this.headers.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
      }
    }

  getAssignmentsPagines(page:number, limit:number):Observable<any> {
    return this.http.get<Assignment[]>(this.uri + "?page=" + page + "&limit=" + limit, {'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }

  addAssignment(assignment:Assignment):Observable<any>{
    return this.http.post<any>(this.uri, assignment,{'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
      );
  }
  updateAssignment(assignment:Assignment):Observable<any>{
    return this.http.put<any>(this.uri, assignment,{'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
      );
  }
  deleteAssignment(assignment:Assignment):Observable<any>{
      return this.http.delete(this.uri+"/"+assignment._id,{'headers':this.headers})
      .pipe(
        catchError((data:any)=>{
          return of(data.error);
        })
        );
  }
  getAssignment(id:number):Observable<any|undefined>{
    return this.http.get<any>(this.uri+"/"+id,{'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
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
