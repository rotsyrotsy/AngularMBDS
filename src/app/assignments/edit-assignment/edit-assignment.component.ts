import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalService } from '../../shared/global.service';

@Component({
 selector: 'app-edit-assignment',
 standalone: true,
 providers: [provideNativeDateAdapter()],
 imports: [
   FormsModule,
   MatInputModule,
   MatFormFieldModule,
   MatDatepickerModule,
   MatButtonModule,
 ],
 templateUrl: './edit-assignment.component.html',
 styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent {
  assignment: Assignment | undefined;
  nomAssignment = '';
  dateDeRendu?: Date = undefined;
 
  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route:ActivatedRoute,
    private globalService:GlobalService
  ) {}

  ngOnInit(){
    const id = this.route.snapshot.params['id'];
    
    this.assignmentsService.getAssignment(id)
    .subscribe((response)=>{
      if(response.success){
        this.assignment = response.data;
        if(response.data !== undefined){
          this.nomAssignment = response.data.nom;
          this.dateDeRendu = response.data.dateDeRendu;
        }
      }else{
        this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
      }
    });
  }
 
  onSaveAssignment() {
    if (!this.assignment) return;
    if (this.nomAssignment == '' || this.dateDeRendu === undefined) return;
 
    // on récupère les valeurs dans le formulaire
    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService
      .updateAssignment(this.assignment)
      .subscribe((response)=>{
        if(response.success){
          this.globalService.openSnackBar(response.message,'',['success-snackbar']);
        }else{
          this.globalService.openSnackBar(response.error,'',['danger-snackbar']);
        }
      });
  }
 }
 