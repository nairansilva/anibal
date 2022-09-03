import { PictureEditModule } from './../../shared/components/picture-edit/pictureEdit/pictureEdit.module';
import { PoComponentsModule } from '@po-ui/ng-components';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentsComponent } from './students/students.component';
import { StudentCardComponent } from './student-card/student-card.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { StudentRoutingModule } from './students-routing.module';



@NgModule({
  declarations: [
    StudentsComponent,
    StudentCardComponent,
    StudentFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PoComponentsModule,
    PictureEditModule,
    StudentRoutingModule
  ]
})
export class StudentsModule { }
