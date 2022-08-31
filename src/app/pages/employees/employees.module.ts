import { PictureEditModule } from './../../shared/components/picture-edit/pictureEdit/pictureEdit.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesComponent } from './employees/employees.component';
import { EmployesCardComponent } from './employes-card/employes-card.component';
import { PoComponentsModule } from '@po-ui/ng-components';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { SafeUrlPipe } from './shared/safe-url.pipe';


@NgModule({
  declarations: [
    EmployeesComponent,
    EmployesCardComponent,
    EmployeeFormComponent,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    PoComponentsModule,
    EmployeesRoutingModule,
    PictureEditModule
  ]
})
export class EmployeesModule { }
