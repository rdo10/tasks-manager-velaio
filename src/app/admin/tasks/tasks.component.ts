import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment'
import { TaskService } from './services/tasks.service';
import { DatatableComponent } from 'src/app/shared/datatable/datatable.component';
import { ModalComponent } from './modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public btnPeople = [`<button class="btn btn-info btn-ver" type="button"><i class="fa fa-users"></i></button> `];
  public btnEditar = [`<button class="btn btn-warning btn-editar" type="button"><i class="fa fa-edit"></i></button> `];
  public columns: any;
  public isModalOpen: boolean = false;
  //public enpoint = environment.url+ 'todos'
  public modales = [];
  public tasks: any = [];
  public peopleId: number = 0;
  public peopleAssociated = [];
  public id: number = 0;
  public status: string = '';
  public task: string = '';
  @ViewChild('datatable') datatable!: DatatableComponent;

constructor(private route: Router){

}

  ngOnInit(): void {
    this.columns = this.cargarTabla();
  }

  cargarTabla() {
    this.columns = [

      {
        title: 'Tarea',
        data: 'nombre'
      },
      {
        title: 'Fecha Límite',
        data: 'fechaLimite',
        render: (data) => {
          const date = new Date(data);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const year = date.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;
          return formattedDate;
        }

      },
      {
        title: 'Estado',
        data: 'estado'
      },
      {
        title: 'Acciones',
        className: 'text-center',
        render: () => {
          return this.btnPeople + ' ' + this.btnEditar
        }
      }
    ];

    return this.columns;
  }

  openModal(event: any) {
    this.peopleAssociated = event.data.personasAsociadas;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  editar(event) {  
    this.id = event.id;
    localStorage.setItem('edit data', JSON.stringify(event.data));
    this.route.navigateByUrl(`tasks/edit/${this.id}`);
  }

}
