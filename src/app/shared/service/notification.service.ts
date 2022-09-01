import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationModel } from '../model/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification$: BehaviorSubject<NotificationModel> = new BehaviorSubject<NotificationModel>({ title: "", body: '', isVisible: false });

  constructor() { }

  setNotification(notification: NotificationModel) {
    this.notification$.next(notification);
  }

  getNotification() {
    return this.notification$.asObservable();
  }

}
