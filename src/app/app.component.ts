import { NotificationService } from './shared/service/notification.service';
import { Component } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { Auth, signInWithEmailAndPassword, signOut, user, getAuth, idToken } from '@angular/fire/auth';
import { PoMenuItem } from '@po-ui/ng-components';
import {canActivate, loggedIn, redirectUnauthorizedTo} from '@angular/fire/auth-guard'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private afMessaging: AngularFireMessaging, private notificationService:NotificationService, private auth:Auth) { }
  ngOnInit() {
    const teste = getAuth();

    const user = teste.currentUser;

    if(!localStorage.getItem('tokenAnibal')) {
      this.requestPermission();
    }
    if(localStorage.getItem('tokenAnibal')) {
      this.listen();
    }

  }

  requestPermission() {
    this.afMessaging.requestToken
    .subscribe(
      (token) => {
        this.listen()
        console.log('Permission granted! Save to the server!', token);
       },
      (error) => { console.error(error); },
    );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message: any) => {
        console.log(message);
        this.notificationService.setNotification({
          body: message.notification.body,
          title: message.notification.title,
          isVisible: true
        })
      });
  }

  readonly menus: Array<PoMenuItem> = [
    { label: 'Home', action: this.onClick.bind(this) }
  ];

  private onClick() {
    alert('Clicked in menu item')
  }

}
