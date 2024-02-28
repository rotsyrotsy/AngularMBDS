import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.component.html',
  styleUrl: './assignments.component.css'
})
export class AssignmentsComponent {
  titre='Liste des assignements';
  assignements=[{
    nom:"TP1 Angular Michel Buffa",
    dateDeRendu:'2024-02-15',
    rendu:false
  },{
    nom:"TP SQL3 de Serge Miranda",
    dateDeRendu:'2024-01-15',
    rendu:true
  },{
    nom:"TP BD Mr Gabriel Mopolo",
    dateDeRendu:'2024-03-01',
    rendu:false
  }]
}
