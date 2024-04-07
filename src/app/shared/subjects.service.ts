import { Injectable } from '@angular/core';
import { Subject } from '../subjects/subject.model';
import { GlobalConstants } from './global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  subjects: Subject[] =[]
  uri = GlobalConstants.urlAPI+'/subject';
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient) {
    const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
        this.headers = this.headers.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
      }
  }
  getAllSubjects(page:number):Observable<any> {
    return this.http.get<Subject[]>(this.uri + "?page=" + page, {'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
}
