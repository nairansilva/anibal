import { mergeMap, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { collection } from '@firebase/firestore';
import { addDoc, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { StudentInterface } from './student.model';


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private firestore: Firestore) { }

  collectionName = 'students';

  getAll(): Observable<StudentInterface[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    const q = query(placeRef,where('name','>=',''))
    return collectionData(q, { idField: 'id',  }).pipe(
    ) as Observable<StudentInterface[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)
    return getDoc(placeRef)

  }

  post(employee:StudentInterface) {
    const placeRef = collection(this.firestore, this.collectionName)
    return addDoc(placeRef, employee)
  }

  put(employee:{ [x: string]: any; }, id:string) {
    const placeRef = doc(this.firestore, this.collectionName)
    return updateDoc(placeRef, employee)
  }

  delete(employee:StudentInterface) {
    const placeRef = doc(this.firestore, `${this.collectionName}/${employee.id}`)
    return deleteDoc(placeRef)
  }

}
