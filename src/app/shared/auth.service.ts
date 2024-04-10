import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalConstants } from './global-constants';
import {  isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  uri = GlobalConstants.urlAPI+"/users";

  constructor(private http:HttpClient, @Inject(PLATFORM_ID) public platformId: object) {
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
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
  getCurrentUser(){
    let fdheaders = new HttpHeaders();
    fdheaders = fdheaders.append('content-type', 'application/json')
    fdheaders = fdheaders.append('Access-Control-Allow-Origin', '*');
    if (isPlatformBrowser(this.platformId)) {
      fdheaders = fdheaders.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
    }
    return this.http.get<any>(this.uri + "/profile", {'headers':fdheaders})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  isAdmin(){
    const isUserAdmin = new Promise(
      (resolve, reject)=>{
        if (isPlatformBrowser(this.platformId)) {
          this.getCurrentUser()
          .subscribe((response) => {
            if (response.success) {
              const userdata = response.data;        
              resolve(userdata.user.role==="ROLE_USER_PROFESSOR");
            } else {
              reject(response.message);
            }
          });
        }
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
