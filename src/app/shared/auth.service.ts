import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { GlobalConstants } from './global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  uri = GlobalConstants.urlAPI+"/users";

  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<any>{
    this.loggedIn=true;

    const body = {"email": email, "password": password};
    return this.http.post<any>(this.uri+"/login", body)
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  
  }
  logOut(){
    this.loggedIn=false;
    localStorage.clear();
  }
  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve, reject)=>{
        resolve(this.loggedIn);
      }
    );
    return isUserAdmin;
  }
  register(formdata:FormData):Observable<any>{
    let headers = new HttpHeaders();
    headers = headers.append('enctype', 'multipart/form-data');
    return this.http.post<any>(this.uri+"/signup", formdata,{ headers: headers })
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  }
}
