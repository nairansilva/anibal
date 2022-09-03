import { ParentFormComponent } from './parent-form/parent-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentsComponent } from './parents/parents.component';

const routes: Routes = [
  { path: '', component: ParentsComponent },
  { path: 'form', component: ParentFormComponent },
  { path: 'form/:id', component: ParentFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParentsRoutingModule {}
