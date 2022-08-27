import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { BaseResourceService } from "src/app/shared/service/base-resource.service";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private router: Router){}
  private userLogged = false;

  isLogged(): boolean {
    return this.userLogged;
  }

  login(): void {
    this.userLogged = true;
    this.router.navigate(['/'])
  }

  logout(): void {
    this.userLogged = false;
  }
}
