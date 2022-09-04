import { StudentInterface } from './student.model';
import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService{

  collectionName = 'students'

  constructor(private firestore:Firestore) {
  }

  getAll(filter: string = ''): Observable<StudentInterface[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    const q = query(placeRef, where('name', '>=', ''))
    return collectionData(q, { idField: 'id', }).pipe(
    ) as Observable<StudentInterface[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)

    return getDoc(placeRef)

  }

  post(objectInput: StudentInterface) {
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
