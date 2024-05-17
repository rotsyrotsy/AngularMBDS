import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  Inject, Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { GlobalConstants } from './global-constants';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  uri = GlobalConstants.urlAPI+"/users";

  headers= new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

  constructor(private http:HttpClient, @Inject(DOCUMENT) private document: Document) {
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
  updateUser(formdata:FormData):Observable<any>{
    return this.http.put<any>(this.uri + "/update", formdata, {'headers':this.getHeaders(true)})
    .pipe(
      catchError((data:any)=>{
        return of(data.error);
      })
    );
  }
  getHeaders(isFormData:boolean=false):HttpHeaders{
    let headers = new HttpHeaders();
    if (isFormData) {
      headers = headers.append('enctype', 'multipart/form-data');
    }else{
      headers = headers.append('content-type', 'application/json');
    }
    headers = headers.append('Access-Control-Allow-Origin', '*');
    // if (isPlatformBrowser(this.platformId)) {
      headers = headers.append('auth-token', localStorage.getItem('token')!=undefined ? ''+localStorage.getItem('token') : '');
    // }
    return headers;
  }
}
