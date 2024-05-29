import { Injectable } from '@angular/core';
import { Assignment } from '../assignments/assignment.model';
import { Observable, Subject, catchError, forkJoin,  of } from 'rxjs';
import { HttpClient,  } from '@angular/common/http';
import { bdNonRenduAssignments } from './data1';
import { bdRendusAssignments } from './data2';
import { GlobalConstants } from './global-constants';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignements: Assignment[] = [];
  uri = GlobalConstants.urlAPI + '/assignment';
  private reloadAssignmentListSubject = new Subject<void>();
  reloadAssignmentListComponent$ = this.reloadAssignmentListSubject.asObservable();

  constructor(private http: HttpClient,
    private authService:AuthService,
  ) {}

  reloadAssignmentListComponent() {
    this.reloadAssignmentListSubject.next();
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
    };
    return this.http.get<Assignment[]>(this.uri + urlParams, {'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
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
    return this.http.get<any>(this.uri + '/nopagination' + urlParams, {'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }

  addAssignment(assignment:Assignment):Observable<any>{
    return this.http.post<any>(this.uri, assignment,{'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
      );
  }
  updateAssignment(id:string, assignment:Assignment):Observable<any>{
    return this.http.put<any>(this.uri+"/"+id,assignment, {'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
      );
  }
  deleteAssignment(assignment:Assignment):Observable<any>{
      return this.http.delete(this.uri+"/"+assignment._id,{'headers':this.authService.getHeaders()})
      .pipe(
        catchError((data: any) => {
          return of(data.error);
        })
      );
  }
  getAssignment(id:number):Observable<any|undefined>{
    return this.http.get<any>(this.uri+"/"+id,{'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }

  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignment: Observable<any>[] = [];

    // bdInitialAssignments.forEach((a) => {
    //   const nouvelAssignment = new Assignment();
    //   nouvelAssignment.nom = a.nom;
    //   nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
    //   nouvelAssignment.rendu = a.rendu;

    //   appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
    // });
    for (let index = 0; index < bdNonRenduAssignments.length; index++) {
      const a = bdNonRenduAssignments[index];
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      if(index<100) nouvelAssignment.student_id = '65f6c287077da0fab286988f'
      if(index>=100 && index<200) nouvelAssignment.student_id = '65f6c27f077da0fab286988b'
      if(index>=200 && index<300) nouvelAssignment.student_id = '66031381739eeab305a6cc87'
      
      if(index<20) nouvelAssignment.subject_id = '6612c2e5fdb693366e35ef58'
      if(index>=20 && index<80) nouvelAssignment.subject_id = '6612fdfcb71c3c4d36697a91'
      if(index>=80 && index<100) nouvelAssignment.subject_id = '6616479e09ac8ed1af1b35e7'
      if(index>=100 && index<150) nouvelAssignment.subject_id = '66478be4587e7527a9dfa13c'
      if(index>=150 && index<200) nouvelAssignment.subject_id = '6647a8cf73118d024c811633'
      if(index>=200 && index<220) nouvelAssignment.subject_id = '6612fdfcb71c3c4d36697a91'
      if(index>=220 && index<300) nouvelAssignment.subject_id = '664858d973118d024c81169d'

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
      
    }
    for (let index = 300; index < bdRendusAssignments.length; index++) {
      const a = bdRendusAssignments[index];
      const nouvelAssignment = new Assignment();
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
      nouvelAssignment.note = a.note.toString();
      nouvelAssignment.remarque = a.remarque;
      if(index<100) nouvelAssignment.student_id = '65f6c287077da0fab286988f'
      if(index>=100 && index<200) nouvelAssignment.student_id = '65f6c27f077da0fab286988b'
      if(index>=200 && index<300) nouvelAssignment.student_id = '66031381739eeab305a6cc87'
      if(index>=300 && index<500) nouvelAssignment.student_id = '66031d6f8e85dabdf224a30f'
      if(index>=500 && index<700) nouvelAssignment.student_id = '66124a7827951d5ae347d7f4'
      
      if(index<20) nouvelAssignment.subject_id = '6612c2e5fdb693366e35ef58'
      if(index>=20 && index<80) nouvelAssignment.subject_id = '6612fdfcb71c3c4d36697a91'
      if(index>=80 && index<100) nouvelAssignment.subject_id = '6616479e09ac8ed1af1b35e7'
      if(index>=100 && index<150) nouvelAssignment.subject_id = '66478be4587e7527a9dfa13c'
      if(index>=150 && index<200) nouvelAssignment.subject_id = '6647a8cf73118d024c811633'
      if(index>=200 && index<220) nouvelAssignment.subject_id = '6612fdfcb71c3c4d36697a91'
      if(index>=220 && index<300) nouvelAssignment.subject_id = '664858d973118d024c81169d'
      if(index>=300 && index<400) nouvelAssignment.subject_id = '66478be4587e7527a9dfa13c'
      if(index>=400 && index<550) nouvelAssignment.subject_id = '6647a8cf73118d024c811633'
      if(index>=550 && index<600) nouvelAssignment.subject_id = '6612c2e5fdb693366e35ef58'
      if(index>=600 && index<700) nouvelAssignment.subject_id = '664858d973118d024c81169d'

      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
      
    }

    return forkJoin(appelsVersAddAssignment);
  }
}
