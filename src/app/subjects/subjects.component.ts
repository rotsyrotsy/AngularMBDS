import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { GlobalService } from '../shared/global.service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { GlobalConstants } from '../shared/global-constants';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { SubjectProfessor } from './subject_professor.model';
import { SubjectsService } from '../shared/subjects.service';
import { AddSubjectComponent } from './add-subject/add-subject.component';

@Component({
  selector: 'app-subjects',
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
    MatListModule,
    CommonModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css'
})
export class SubjectsComponent {

  subjects: SubjectProfessor[] = [];
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  displayedColumns: string[] = ['picture', 'name', 'professor'];
  searchKeyword = '';
  searchDateDeRendu = undefined;
  defaultImage = GlobalConstants.defaultImage;
  isAdmin=false;
  
  constructor(
    private subjectsService: SubjectsService,
    private globalService: GlobalService,
    private router: Router,
    public dialog: MatDialog,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getSubjectsFromService();
    this.authService.isAdmin().then((admin) => {
      if (admin) {
        this.isAdmin = true;
      }
    });
  }
  getSubjectsFromService(load=true) {
    if(load) this.globalService.setLoading(true);
    this.subjectsService
      .getAllSubjects(this.page)
      .subscribe((data) => {
        if (data.success) {
          console.log(data);
          data = data.data;
          this.subjects = data.docs;
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
          this.globalService.openSnackBar(data.error, '', ['danger-snackbar']);
        }
        if(load) this.globalService.setLoading(false);
      });
  }
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getSubjectsFromService();
  }
  navigateDetails(id: String | undefined) {
    this.router.navigate(['subject', id]);
  }
  openAddDialog(){
    if(!this.isAdmin){
      this.globalService.openSnackBar("Vous ne pouvez pas accéder à cette fonctionnalité.", '', ['danger-snackbar']);  
    }else{
      this.dialog.open(AddSubjectComponent, {
        minWidth: '500px',
        data: {
          callbackFunction: () => {
            this.getSubjectsFromService(false);
          },
        },
      });
    }
  }
}
