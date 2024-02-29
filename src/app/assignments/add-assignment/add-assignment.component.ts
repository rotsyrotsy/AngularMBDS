import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { Assignment } from '../assignment.model';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  imports: [CommonModule, FormsModule, 
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatDatepickerModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  @Output()
  nouvelAssignment = new EventEmitter<Assignment>();

  //champs du formulaire
  nomAssignment='';
  dateDeRendu=undefined;

  onSubmit(event:any){
    if((this.nomAssignment=='' || this.dateDeRendu===undefined)) return;

    let newAssignment = new Assignment();
    newAssignment.nom = this.nomAssignment;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;

    this.nouvelAssignment.emit(newAssignment);
  }
}
