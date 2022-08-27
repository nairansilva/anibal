import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/shared/login.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.loginService.isLogged()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

  constructor(private loginService: LoginService, private router: Router) {}
}
