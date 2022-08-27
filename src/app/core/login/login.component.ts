import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLoginLiterals } from '@po-ui/ng-templates';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  literals:PoPageLoginLiterals;
  constructor(private router:Router, private loginService:LoginService) {
    this.literals = {
      welcome: `Bem Vindo`,
      loginPlaceholder: 'Informe o seu Usuário',
      loginHint: "Informe o e-mail utilizado no cadastro de usuário",
      titlePopover: 'AAAAAAAAAAAAAa',
      loginErrorPattern: "Login Inválido",
    }
  }

  ngOnInit(): void {
  }

  login(usuario:any): void {
    console.log(usuario);
    this.loginService.login();

  }

}
