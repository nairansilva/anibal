import { MenuComponent } from './menu.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', component: MenuComponent, ...canActivate(() => redirectUnauthorizedTo(['/login'])) ,children:[
    {
      path: '',
      loadChildren: () =>
        import('../../pages/home/home.module').then((m) => m.HomeModule), ...canActivate(() => redirectUnauthorizedTo(['/login'])),
    },
    {
      path: 'employees',
      loadChildren: () =>
        import('../../pages/employees/employees.module').then((m) => m.EmployeesModule), ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    {
      path: 'students',
      loadChildren: () =>
        import('../../pages/students/students.module').then((m) => m.StudentsModule), ...canActivate(() => redirectUnauthorizedTo(['/login']))
    },
    {
      path: 'parents',
      loadChildren: () =>
        import('../../pages/parents/parents.module').then((m) => m.ParentsModule), ...canActivate(() => redirectUnauthorizedTo(['/login']))
    }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
