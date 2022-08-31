import { PoNotificationService } from '@po-ui/ng-components';
import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { BaseResourceService } from "src/app/shared/service/base-resource.service";
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

  setLogged(isValid:boolean): void {
    this.userLogged = isValid;
  }

  login(usuario:PoPageLogin): Promise<any> {
    return signInWithEmailAndPassword(this.auth,usuario.login, usuario.password)

  }

  logout(): Promise<any> {
    return signOut(this.auth);
  }
}
