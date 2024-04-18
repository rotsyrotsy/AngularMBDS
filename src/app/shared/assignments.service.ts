import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, catchError, forkJoin,  of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data';
import { GlobalConstants } from './global-constants';
import {  isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignements: Assignment[] = [];
  uri = GlobalConstants.urlAPI + '/assignment';

  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) public platformId: object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.headers = this.headers.append(
        'auth-token',
        localStorage.getItem('token') != undefined
          ? '' + localStorage.getItem('token')
          : ''
      );
    }
  }

  getAssignmentsPagines(
    page: number,
    limit: number,
    params: any = {}
  ): Observable<any> {
    let urlParams: string = '?page=' + page + '&limit=' + limit;
    if (params) {
      for (let key of Object.keys(params)) {
        urlParams += '&' + key + '=' + params[key];
      }
    }
    console.log("liiiiiiiiiiiste",this.headers);
    return this.http
      .get<Assignment[]>(this.uri + urlParams, { headers: this.headers })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }
  getAssignmentsNoPagination(params: any = {}): Observable<any> {
    let urlParams: string = '';
    if (params) {
      let i = 0;
      for (let key of Object.keys(params)) {
        if (i == 0) urlParams += '?';
        urlParams += '&' + key + '=' + params[key];
        i++;
      }
    }
    return this.http
      .get<any>(this.uri + '/nopagination' + urlParams, {
        headers: this.headers,
      })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    return this.http
      .post<any>(this.uri, assignment, { headers: this.headers })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }
  updateAssignment(id: string, assignment: Assignment): Observable<any> {    
    return this.http
      .put<any>(this.uri + '/' + id, assignment, { headers: this.headers })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }
  deleteAssignment(assignment: Assignment): Observable<any> {
    return this.http
      .delete(this.uri + '/' + assignment._id, { headers: this.headers })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }
  getAssignment(id: number): Observable<any | undefined> {
    return this.http
      .get<any>(this.uri + '/' + id, { headers: this.headers })
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    bdInitialAssignments.forEach((a) => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    });

    return forkJoin(appelsVersAddAssignment);
  }
}
