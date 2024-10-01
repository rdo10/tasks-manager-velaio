import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TasksComponent } from './tasks.component';
import { FormComponent } from './form/form.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown';
import { ModalComponent } from './modal/modal.component';





@NgModule({
  declarations: [TasksComponent,FormComponent,ModalComponent],
  imports: [
    CommonModule,
    RouterModule,
    AngularMultiSelectModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    ReactiveFormsModule,
    SharedModule,
    TasksRoutingModule
  ],
})
export class TasksModule { }
