import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from '../assignment.model';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { GlobalService } from '../../shared/global.service';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [RouterOutlet,RouterLink,MatButtonModule,MatCardModule,CommonModule,MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  assignmentTransmis!: Assignment|undefined;

  constructor(private assignmentsService:AssignmentsService,
    private route: ActivatedRoute,
    private router:Router,
    private globalService : GlobalService){}

  ngOnInit():void{
    const id = this.route.snapshot.params['id'];
    
    this.assignmentsService.getAssignment(id)
    .subscribe((response)=>{
        if(response.success){
          this.assignmentTransmis = response.data;
        }else{
          this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
        }
    });
  }

  onAssignmentRendu(){
    if(this.assignmentTransmis){
      this.assignmentTransmis.rendu=true;
      
      this.assignmentsService.updateAssignment(this.assignmentTransmis)
      .subscribe((response)=>{
        if(response.success){
          this.globalService.openSnackBar(response.message,'',['success-snackbar']);
        }else{
          this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
        }
      });
    }
  }
  onDeleteAssignment(){
    if(this.assignmentTransmis){
      this.assignmentsService.deleteAssignment(this.assignmentTransmis)
      .subscribe((response)=>{
        if(response.success){
          this.assignmentTransmis=undefined;
          this.globalService.openSnackBar(response.message,'',['success-snackbar']);
        }else{
          this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
        }
      });
    }
    this.router.navigate(['/home']);

  }
}
