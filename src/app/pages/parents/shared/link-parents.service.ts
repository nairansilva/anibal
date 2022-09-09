import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FilterFirebaseInterface } from 'src/app/shared/model/filterFirebase.interface';
import { LinkParentInterface } from './link-parents.interface';

@Injectable({
  providedIn: 'root'
})
export class LinkParentsService {

  collectionName = 'studentxparent'

  constructor(private firestore: Firestore) {
  }

  getAll(filter: FilterFirebaseInterface): Observable<LinkParentInterface[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    if (filter) {
      const q = query(placeRef, where(`${filter.field}`, `${filter.operator}`, `${filter.value}`))
      return collectionData(q, { idField: 'id', }).pipe(
      ) as Observable<LinkParentInterface[]>
    } else {
      return collectionData(placeRef, { idField: 'id', }).pipe(
      ) as Observable<LinkParentInterface[]>
    }
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)

    return getDoc(placeRef)

  }

  post(objectInput: LinkParentInterface) {
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
