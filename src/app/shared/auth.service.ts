import { HttpClient } from '@angular/common/http';
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
  register(params:Object):Observable<any>{
    console.log(params);
    
    return this.http.post<any>(this.uri+"/signup", params)
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  }
}
