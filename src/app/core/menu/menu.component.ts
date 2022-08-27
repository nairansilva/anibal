import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menus: Array<PoMenuItem>;
  constructor(private router:Router) { }

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
        label: 'Funcionários',
        shortLabel: 'Funcionários',
        action: () => {
          this.router.navigate(['/employees']);
        },
        icon: 'po-icon-users',
      },
      {
        label: 'Turmas',
        shortLabel: 'Turmas',
        action: () => {
          // this.router.navigate(['/intranet/assentamentos']);
        },
        icon: 'po-icon-warehouse',
      },
      {
        label: 'Responsáveis',
        shortLabel: 'Responsáveis',
        action: () => {
          // this.router.navigate(['/intranet/assentamentos']);
        },
        icon: 'po-icon-warehouse',
      },
      {
        label: 'Alunos',
        shortLabel: 'Alunos',
        action: () => {
          // this.router.navigate(['/intranet/assentamentos']);
        },
        icon: 'po-icon-warehouse',
      },
      {
        label: 'Notificações',
        shortLabel: 'Notificações',
        action: () => {
          // this.router.navigate(['/intranet/assentamentos']);
        },
        icon: 'po-icon-warehouse',
      }

    ];

    return menu

  }
}
