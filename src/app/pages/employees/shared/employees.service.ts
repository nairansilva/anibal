import { EmployeesInterface } from './employees.model';
import { Injectable, Injector } from '@angular/core';
import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService extends BaseResourceFirebaseService<EmployeesInterface> {

  constructor(protected injector: Injector) {
    super(injector, 'employees')
  }



}
