import { LinkParentsComponent } from './link-parents/link-parents.component';
import { StudentsComponent } from './students/students.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentFormComponent } from './student-form/student-form.component';

const routes: Routes = [
  { path: '', component: StudentsComponent },
  { path: 'form', component: StudentFormComponent },
  { path: 'form/:id', component: StudentFormComponent },
  { path: ':id/link', component: LinkParentsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentRoutingModule {}
