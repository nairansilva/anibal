import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoUiComponentsModule } from 'src/app/shared/modules/po-ui-components.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';


@NgModule({
  declarations: [MenuComponent],
  imports: [
    MenuRoutingModule,
    PoUiComponentsModule,
    CommonModule,
    RouterModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
