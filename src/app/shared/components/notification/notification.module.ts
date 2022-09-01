import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from './notification/notification.component';



@NgModule({
  declarations: [
    NotificationComponent
  ],
  exports:[NotificationComponent],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { }
