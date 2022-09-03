import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { StudentInterface } from './student.model';
import { BaseResourceFirebaseService } from 'src/app/shared/service/base-resource-firebase.service';


@Injectable({
  providedIn: 'root'
})
export class StudentService extends BaseResourceFirebaseService<StudentInterface>{

  constructor(protected override firestore: Firestore) {
    super('studants', firestore)
  }
}
