import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalConstants } from './global-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  uri = GlobalConstants.urlAPI+"/users";

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient) {
      const localStorage = document.defaultView?.localStorage;
      if (localStorage) {
        this.headers = this.headers.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
      }
    }
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
  getCurrentUser(){
    return this.http.get<any>(this.uri + "/profile", {'headers':this.headers})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve, reject)=>{
        this.getCurrentUser()
        .subscribe((response) => {
          if (response.success) {
            const userdata = response.data;        
            // console.log(userdata.user.role,userdata.user.role==="ROLE_USER_PROFESSOR");
                
            resolve(userdata.user.role==="ROLE_USER_PROFESSOR");
          } else {
            reject(response.message);
          }
        });
      }
    );
    return isUserAdmin;
  }
  register(formdata:FormData):Observable<any>{
    let fdheaders = new HttpHeaders();
    fdheaders = fdheaders.append('enctype', 'multipart/form-data');
    return this.http.post<any>(this.uri+"/signup", formdata,{ headers: fdheaders })
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      }
      )
    )
  }
}
