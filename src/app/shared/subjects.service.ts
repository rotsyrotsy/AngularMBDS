import {  Injectable} from '@angular/core';
import { Subject } from '../subjects/subject.model';
import { GlobalConstants } from './global-constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  subjects: Subject[] =[]
  uri = GlobalConstants.urlAPI+'/subject';

  constructor(private http:HttpClient, private authService:AuthService) {}

  getAllSubjects(page:number):Observable<any> {
    return this.http.get<Subject[]>(this.uri + "?page=" + page, {'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  getAllSubjectsNoPagination():Observable<any> {
    return this.http.get<Subject[]>(this.uri + "/nopagination", {'headers':this.authService.getHeaders()})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  addSubject(formdata:FormData):Observable<any>{
    return this.http.post<any>(this.uri, formdata,{ headers: this.authService.getHeaders(true)})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  }
}
