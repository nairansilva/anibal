import { LoginService } from './../login/shared/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem, PoNotificationService } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem>;
  constructor(private router:Router, private loginService:LoginService, private poNotificationService:PoNotificationService) { }

  ngOnInit(): void {
    this.setHomeInfo();
  }

  private setHomeInfo(): void {
    this.menus = this.getMenus();
  }

  private getMenus(): Array<PoMenuItem> {
    const menu: Array<PoMenuItem> = [
      {
        label: 'Home',
        action: () => {
          this.router.navigate(['/']);
        },
        shortLabel: 'Home',
        icon: 'po-icon-home',
      },
      {
        label: 'Colaboradores',
        shortLabel: 'Colab.',
        action: () => {
          this.router.navigate(['/employees']);
        },
        icon: 'po-icon-users',
      },
      {
        label: 'Alunos',
        shortLabel: 'Alunos',
        action: () => {
          this.router.navigate(['/students']);
        },
        icon: 'po-icon-like',
      },
      {
        label: 'Responsáveis',
        shortLabel: 'Resp.',
        action: () => {
          this.router.navigate(['/parents']);
        },
        icon: 'po-icon-eye',
      },
      {
        label: 'logout',
        shortLabel: 'logout',
        action: () => {
           this.loginService.logout().then(
            res => {
              this.router.navigate(['/login']);
            }
           ).catch(
            error => this.poNotificationService.error("Erro ao realizar logout")
           );
        },
        icon: 'po-icon-warehouse',
      }

    ];

    return menu

  }
}
