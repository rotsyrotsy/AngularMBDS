import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }
  log(nom:string, action:string){
    console.log("L'assignment "+nom+" a ete "+action);
  }
}
