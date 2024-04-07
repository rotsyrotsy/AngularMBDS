import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private loading: boolean = false;
  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message:string, action:string, classes:string[]):void{
    this._snackBar.open(message,action,{
          panelClass: classes,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 2000,
        });
  }
  closeSnackBar():void{
    this._snackBar.dismiss();
  }
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  getLoading(): boolean {
    return this.loading;
  }
}
