import { Routes } from '@angular/router';
import { AssignmentsComponent } from './assignments/assignments.component';
import { AddAssignmentComponent } from './assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LayoutComponent } from './layout/layout.component';
import { SignupComponentComponent } from './authentication/signup-component/signup-component.component';
import { LoginComponentComponent } from './authentication/login-component/login-component.component';
import { authStudentGuard } from './shared/authStudent.guard';
import { SubjectsComponent } from './subjects/subjects.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'auth',
    component:AuthenticationComponent,
    children:[
        {path:'login', component:LoginComponentComponent},
        {path:'signup', component:SignupComponentComponent},
    ]},
    {path:'',
    component:LayoutComponent,
    children:[
        {path:'home', component:AssignmentsComponent},
        {path:'add', component:AddAssignmentComponent, canActivate: [authStudentGuard]},
        {path:'assignment/:id', component:AssignmentDetailComponent},
        {path:'assignment/:id/edit', component:EditAssignmentComponent, canActivate: [authGuard]},
        {path:'subjects', component:SubjectsComponent},
        {path:'profile', component:UsersComponent},
    ]},

    

];
