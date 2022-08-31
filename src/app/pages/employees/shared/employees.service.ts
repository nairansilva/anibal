import { EmployeesInterface } from './employees.model';
import { mergeMap, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { collection } from '@firebase/firestore';
import { addDoc, collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
import { Storage, ref, uploadBytes, listAll, getDownloadURL, ListResult, deleteObject } from "@angular/fire/storage";


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private firestore: Firestore, private storage: Storage) { }

  getAll(): Observable<EmployeesInterface[]> {
    const placeRef = collection(this.firestore, 'employees')
    const q = query(placeRef,where('name','>=',''))
    return collectionData(q, { idField: 'id',  }).pipe(
    ) as Observable<EmployeesInterface[]>
  }

  getById(id: string): Promise<any> {
    const placeRef = doc(this.firestore, 'employees', id)

    return getDoc(placeRef)

  }

  post(employee:EmployeesInterface) {
    const placeRef = collection(this.firestore, 'employees')
    return addDoc(placeRef, employee)
  }

  put(employee:{ [x: string]: any; }, id:string) {
    const placeRef = doc(this.firestore, `employees/${id}`)
    return updateDoc(placeRef, employee)
  }

  delete(employee:EmployeesInterface) {
    const placeRef = doc(this.firestore, `employees/${employee.id}`)
    return deleteDoc(placeRef)
  }

  uploadAvatar(imgFile: any, idImg: string) {
    const imgRef = ref(this.storage, `employess/${idImg}/${idImg}`)

    return uploadBytes(imgRef, imgFile)
  }

  getImage(id:string, imgName: string): Promise<ListResult> {
    const imgRef = ref(this.storage, `/employess/${id}`)

    return listAll(imgRef)
  }

  deleteAvatar(idImg: string) {
    const imgRef = ref(this.storage, `employess/${idImg}/${idImg}`)

    return deleteObject(imgRef)
  }

}
