import { Component } from '@angular/core';
import { Assignment } from '../assignment.model';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterOutlet, RouterLink } from '@angular/router';
import { GlobalService } from '../../shared/global.service';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import { AssignmentFK } from '../assignment_fk.model';
import { GlobalConstants } from '../../shared/global-constants';

@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [MatIconModule,MatGridListModule,RouterOutlet,RouterLink,MatButtonModule,MatCardModule,CommonModule,MatCheckboxModule],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  assignmentTransmis!: AssignmentFK|undefined;
  defaultImage = GlobalConstants.defaultImage;
  constructor(private assignmentsService:AssignmentsService,
    private route: ActivatedRoute,
    private router:Router,
    private globalService : GlobalService){}

  ngOnInit():void{
    const id = this.route.snapshot.params['id'];
    
    this.globalService.setLoading(true);
    this.assignmentsService.getAssignment(id)
    .subscribe((response)=>{
      console.log(response.data[0]);
      
        if(response.success){
          this.assignmentTransmis = response.data[0];
        }else{
          this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
        }
        this.globalService.setLoading(false);
    });
  }
  getColorRendu(a:any){
    return a.rendu ? 'green' : 'red';
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
