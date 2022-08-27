import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoUiComponentsModule } from 'src/app/shared/modules/po-ui-components.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    PoUiComponentsModule,
    SharedModule
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
