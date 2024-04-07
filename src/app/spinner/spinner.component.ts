import { Component } from '@angular/core';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {
  constructor(public globalService: GlobalService) { }
}
