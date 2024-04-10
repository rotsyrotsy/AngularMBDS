import { Component } from '@angular/core';
import { AssignmentFK } from '../assignment_fk.model';
import { GlobalConstants } from '../../shared/global-constants';
import { AssignmentsService } from '../../shared/assignments.service';
import { GlobalService } from '../../shared/global.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../shared/auth.service';
import { DialogDeleteAssignmentComponent } from '../dialog-delete-assignment/dialog-delete-assignment.component';
import { RenduDirective } from '../../shared/rendu.directive';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import moment from 'moment';

@Component({
  selector: 'app-list-assignments',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatGridListModule,
    MatIconModule,
    MatPaginatorModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatSliderModule,
    RouterOutlet,
    RouterLink,
    MatButtonModule,
    RenduDirective,
    MatListModule,
    CommonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './list-assignments.component.html',
  styleUrl: './list-assignments.component.css',
})
export class ListAssignmentsComponent {
  assignements: AssignmentFK[] = [];
  page = 1;
  limit = 8;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];
  searchKeyword = '';
  searchDateDeRendu = undefined;
  renduKeyword=null;
  defaultImage = GlobalConstants.defaultImage;
  isAdmin = false;

  constructor(
    private assignmentsService: AssignmentsService,
    private globalService: GlobalService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  getColorRendu(a: any) {
    return a.rendu ? 'green' : 'red';
  }
  ngOnInit(): void {
    this.getAssignmentFromService();
    this.authService.isAdmin().then((admin) => {
      if (admin) {
        this.isAdmin = true;
      }
    });
  }
  getAssignmentFromService(params:any = {}) {
    this.globalService.setLoading(true);
    this.assignmentsService
      .getAssignmentsPagines(this.page, this.limit, params)
      .subscribe((data) => {
        if (data.success) {
          data = data.data;
          this.assignements = data.docs;
          this.page = data.page;
          this.limit = data.limit;
          this.totalDocs = data.totalDocs;
          this.totalPages = data.totalPages;
          this.nextPage = data.nextPage;
          this.prevPage = data.prevPage;
          this.hasNextPage = data.hasNextPage;
          this.hasPrevPage = data.hasPrevPage;
          this.globalService.closeSnackBar();
        } else {
          this.globalService.openSnackBar(data.error ? data.error : data.message, '', ['danger-snackbar']);
        }
        this.globalService.setLoading(false);
      });
  }
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentFromService();
  }
  getAssignmentsFromService() {}
  premierePage() {
    this.page = 1;
    this.getAssignmentFromService();
  }
  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentFromService();
  }
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentFromService();
  }
  navigateDetails(id: String | undefined) {
    this.router.navigate(['assignment', id]);
  }
  onDeleteAssignment(assignment: AssignmentFK) {
    if (assignment) {
      this.dialog.open(DialogDeleteAssignmentComponent, {
        width: '250px',
        data: {
          assignment: assignment,
          callbackFunction: () => {
            this.getAssignmentFromService();
          },
        },
      });
    }
  }
  onSearchAssignments(){
    if (this.searchKeyword == '' && this.searchDateDeRendu==undefined && this.renduKeyword==null) return;
    let params:any={};
    if(this.searchKeyword != '') params.nom = this.searchKeyword;
    if(this.searchDateDeRendu != undefined) params.dateDeRendu = moment(this.searchDateDeRendu).format('YYYY-MM-DD');
    if(this.renduKeyword != null) params.rendu =this.renduKeyword;
    this.getAssignmentFromService(params);
  }
}
