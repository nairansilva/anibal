import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { PoPageLogin } from '@po-ui/ng-templates';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router, private auth: Auth, private poNotificationService:PoNotificationService){}
  private userLogged = false;

  isLogged(): boolean {
    return this.userLogged;
  }

  setLogged(isValid:boolean, token:any): void {
    localStorage.setItem('tokenAnibal', String(token.user.accessToken))
    // console.log(token)
    this.userLogged = isValid;
  }

  login(usuario:PoPageLogin): Promise<any> {
    return signInWithEmailAndPassword(this.auth,usuario.login, usuario.password)

  }

  logout(): Promise<any> {
    localStorage.removeItem('tokenAnibal')
    return signOut(this.auth);
  }
}
