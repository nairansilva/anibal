import { Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from 'firebase/firestore';
import { Inject, Injector } from '@angular/core';
import { collectionData } from '@angular/fire/firestore';


export abstract class BaseResourceFirebaseService<T> {

  // protected firestore: Firestore

  constructor(protected collectionName: string, protected firestore:Firestore) {
    // this.firestore = this.Injector.get(Firestore);
  }

  getAll(filter: string = ''): Observable<T[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    const q = query(placeRef, where('name', '>=', ''))
    return collectionData(q, { idField: 'id', }).pipe(
    ) as Observable<T[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)

    return getDoc(placeRef)

  }

  post(objectInput: T) {
    const placeRef = collection(this.firestore, this.collectionName)
    return addDoc(placeRef, objectInput)
  }

  put(objectInput: T, id: string) {
    const placeRef = doc(this.firestore, `${this.collectionName}/${id}`)
    return updateDoc(placeRef, objectInput)
  }

  delete(id: string) {
    const placeRef = doc(this.firestore, `${this.collectionName}/${id}`)
    return deleteDoc(placeRef)
  }

}
