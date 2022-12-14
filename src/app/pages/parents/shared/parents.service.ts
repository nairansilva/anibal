import { Injectable } from '@angular/core';
import { ParentsInterface } from './parents.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Observable, from, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParentsService{

  collectionName = 'parents'

  constructor(private firestore:Firestore) {
  }

  getAll(filter: string = ''): Observable<ParentsInterface[]> {
    const placeRef = collection(this.firestore, this.collectionName)
    const q = query(placeRef, where('name', '>=', ''))
    return collectionData(q, { idField: 'id', }).pipe(
    ) as Observable<ParentsInterface[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, this.collectionName, id)
    return getDoc(placeRef)

  }

  getUserEventSummary(userId:string) {
    const placeRef = doc(this.firestore, this.collectionName, userId)
    return from(getDoc(placeRef)).pipe(
      filter((docSnap) => docSnap.exists()),
      map(docSnap => docSnap.data())
    );
  }



  post(objectInput: ParentsInterface) {
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
