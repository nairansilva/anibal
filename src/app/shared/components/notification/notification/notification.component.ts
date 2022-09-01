import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationModel } from 'src/app/shared/model/notification';
import { NotificationService } from 'src/app/shared/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  showPanel: boolean;
  notification: NotificationModel;
  notificationSub: Subscription;
  notificationTimeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotification()
      .subscribe(n => {
        this.notification = n;
        this.showPanel = (n !== null && n.title !== '');

        this.notificationTimeout = setTimeout(() => {
          this.showPanel = false;
        }, 3000);
      });
  }

  dismissNotification() {
    this.showPanel = false;
  }

  ngOnDestroy() {
    this.notificationSub.unsubscribe();
    clearTimeout(this.notificationTimeout);
  }
}
