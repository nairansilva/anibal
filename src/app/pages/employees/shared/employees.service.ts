import { EmployeesInterface } from './employees.model';
import { Inject, Injectable, Injector } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
//extends BaseResourceFirebaseService<EmployeesInterface>
//    super(injector, 'employees')

export class EmployeesService{
  collectionName = 'employees'

  constructor(private firestore:Firestore) {
  }

  getAll(filter: string = ''): Observable<EmployeesInterface[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    const q = query(placeRef, where('name', '>=', ''))
    return collectionData(q, { idField: 'id', }).pipe(
    ) as Observable<EmployeesInterface[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)

    return getDoc(placeRef)

  }

  post(objectInput: EmployeesInterface) {
    const placeRef = collection(this.firestore, this.collectionName)
    return addDoc(placeRef, objectInput)
  }

  put(objectInput: { [x: string]: any; }, id: string) {
    const placeRef = doc(this.firestore, `${this.collectionName}/${id}`)
    return updateDoc(placeRef, objectInput)
  }

  delete(id: string) {
    const placeRef = doc(this.firestore, `${this.collectionName}/${id}`)
    return deleteDoc(placeRef)
  }


}
