import { PictureEditModule } from './../components/picture-edit/pictureEdit/pictureEdit.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonePipe } from '../customPipes/phone.pipe';
import { PoUiComponentsModule } from './po-ui-components.module';

@NgModule({
  declarations:[PhonePipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoUiComponentsModule,
    PictureEditModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PoUiComponentsModule,
    PhonePipe
  ],
})
export class SharedModule {}
