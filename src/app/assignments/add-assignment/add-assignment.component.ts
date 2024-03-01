import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import {provideNativeDateAdapter} from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, FormsModule, 
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatDatepickerModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  //champs du formulaire
  nomAssignment='';
  dateDeRendu=undefined;
  constructor(private assignmentsService:AssignmentsService,
    private router:Router){}

  onSubmit(event:any){
    if((this.nomAssignment=='' || this.dateDeRendu===undefined)) return;

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.assignmentsService.addAssignment(newAssignment)
    .subscribe((reponse)=>{
      console.log(reponse);
      this.router.navigate(['/home']);
    });
  }
}
