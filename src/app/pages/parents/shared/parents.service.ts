import { Injectable } from '@angular/core';
import { Firestore } from 'firebase/firestore';
import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';
import { ParentsInterface } from './parents.model';

@Injectable({
  providedIn: 'root'
})
export class ParentsService  extends BaseResourceFirebaseService<ParentsInterface>{

  constructor(protected override firestore: Firestore) {
    super('', firestore)
  }
}
