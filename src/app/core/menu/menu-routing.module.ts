import { MenuComponent } from './menu.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path: '', component: MenuComponent, children:[
    {
      path: '',
      loadChildren: () =>
        import('../../pages/home/home.module').then((m) => m.HomeModule), canActivate:[AuthGuard]
    },
    {
      path: 'employees',
      loadChildren: () =>
        import('../../pages/employees/employees.module').then((m) => m.EmployeesModule), canActivate:[AuthGuard]
    },
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
