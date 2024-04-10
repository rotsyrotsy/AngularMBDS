import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Subject } from '../subjects/subject.model';
import { GlobalConstants } from './global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  subjects: Subject[] =[]
  uri = GlobalConstants.urlAPI+'/subject';
  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient,@Inject(PLATFORM_ID) public platformId: object) {
      if (isPlatformBrowser(this.platformId)) {
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
  getAllSubjectsNoPagination():Observable<any> {
    return this.http.get<any>(this.uri + "/nopagination", {'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  addSubject(formdata:FormData):Observable<any>{
    let fdheaders = new HttpHeaders();
    fdheaders = fdheaders.append('enctype', 'multipart/form-data');
    if (isPlatformBrowser(this.platformId)) {
      fdheaders = fdheaders.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
    }
    return this.http.post<any>(this.uri, formdata,{ headers: fdheaders })
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  }
}
