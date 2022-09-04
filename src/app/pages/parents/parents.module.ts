import { ParentsRoutingModule } from './parents-routing.module';
import { PoComponentsModule } from '@po-ui/ng-components';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParentsComponent } from './parents/parents.component';
import { ParentCardComponent } from './parent-card/parent-card.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { PictureEditModule } from 'src/app/shared/components/picture-edit/pictureEdit/pictureEdit.module';



@NgModule({
  declarations: [
    ParentsComponent,
    ParentCardComponent,
    ParentFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PictureEditModule,
    PoComponentsModule,
    ParentsRoutingModule,
  ]
})
export class ParentsModule { }
