import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { EmployeesInterface } from './employees.model';
import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
//extends BaseResourceFirebaseService<EmployeesInterface>
//    super(injector, 'employees')

export class EmployeesService extends BaseResourceFirebaseService<EmployeesInterface>{

  constructor(protected override firestore: Firestore) {
    super('employees', firestore)
  }
}
