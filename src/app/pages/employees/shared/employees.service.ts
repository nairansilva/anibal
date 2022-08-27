import { EmployeesInterface } from './employees.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { collection } from '@firebase/firestore';
import { collectionData, Firestore, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firestore: Firestore) { }

  getAll(): Observable<EmployeesInterface[]> {
    const placeRef = collection(this.firestore, 'employees')
    return collectionData(placeRef, {idField: 'id'}) as Observable<EmployeesInterface[]>
  }

}
