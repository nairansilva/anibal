import { LoginService } from './shared/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PoPageLogin, PoPageLoginLiterals } from '@po-ui/ng-templates';
import { PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  literals: PoPageLoginLiterals;
  inProcess = false;

  constructor(private router: Router, private loginService: LoginService, private poNotificationService: PoNotificationService) {
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

  login(usuario: PoPageLogin): void {
    this.inProcess = true
    this.loginService.login(usuario).then(res => {
      this.loginService.setLogged(true, res);
      this.router.navigate(['/']);
    })
      .catch(error => {
        this.poNotificationService.error("Erro ao realizar login: " + error);
      }).finally(
        () => this.inProcess = false
      )

  }

}
