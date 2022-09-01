import { Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from 'firebase/firestore';
import { collectionData } from '@angular/fire/firestore';
import { Injector } from '@angular/core';

export abstract class BaseResourceFirebaseService<T> {

  constructor(    protected injector: Injector,
    private firestore: Firestore) { }

  getAll(collectionName:string="", filter:string = ''): Observable<T[]> {
    const placeRef = collection(this.firestore, 'employees')
    const q = query(placeRef,where('name','>=',''))
    return collectionData(q, { idField: 'id',  }).pipe(
    ) as Observable<T[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, 'employees', id)

    return getDoc(placeRef)

  }

  post(collectionName:string="", objectInput: T) {
    const placeRef = collection(this.firestore, 'employees')
    return addDoc(placeRef, objectInput)
  }

  put(collectionName:string="", objectInput: T, id:string) {
    const placeRef = doc(this.firestore, `${collectionName}/${id}`)
    return updateDoc(placeRef, objectInput)
  }

  delete(id:string) {
    const placeRef = doc(this.firestore, `employees/${id}`)
    return deleteDoc(placeRef)
  }

}
