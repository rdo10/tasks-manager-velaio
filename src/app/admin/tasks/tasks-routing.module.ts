import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksComponent } from './tasks.component';
import { FormComponent } from 'src/app/admin/tasks/form/form.component';

const routes: Routes = [
  {path: '', component: TasksComponent},
  {path: 'new', component: FormComponent},
  {
    path: 'edit/:id',
    component: FormComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
