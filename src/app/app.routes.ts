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
import { authAdminGuard } from './shared/authAdmin.guard';
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
        {path:'home', component:AssignmentsComponent, canActivate: [authGuard]},
        {path:'add', component:AddAssignmentComponent, canActivate: [authGuard]},
        {path:'assignment/:id', component:AssignmentDetailComponent , canActivate: [authGuard]},
        {path:'assignment/:id/edit', component:EditAssignmentComponent, canActivate: [authGuard, authAdminGuard]},
        {path:'subjects', component:SubjectsComponent , canActivate: [authGuard]},
        {path:'profile', component:UsersComponent , canActivate: [authGuard]},
    ]},



];
