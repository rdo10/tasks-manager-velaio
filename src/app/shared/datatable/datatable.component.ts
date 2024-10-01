import { Component, OnInit, OnDestroy, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { ModalObject } from '../../models/modalObject';
import DataTables, { Config } from 'datatables.net';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, OnDestroy {

  dtOptions: Config = {};
  @Input() columns: any;
  @Input() modal: any = ''; 
  @Input() id: number; 
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  @Input() modales!: Array<any>;
  @Output() accionRerender = new EventEmitter<void>();
  @Output() accionEliminar = new EventEmitter<any>();
  @Output() accionEditar = new EventEmitter<any>();
  @Output() accionVer = new EventEmitter<any>();
  dtTrigger: Subject<any> = new Subject<any>();
  taskData: any[] = [];

  constructor() { }

  ngOnInit(): void {
    // Cargar datos desde localStorage
    this.loadTasksFromLocalStorage();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json'
      },
      data: this.taskData, // Asignar datos directamente
      columns: this.columns,
      rowCallback: (row, data: any) => {
        this.setupRowActions(row, data);
      }
    };

    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Método para cargar tareas desde localStorage
  private loadTasksFromLocalStorage() {
    const tasks = localStorage.getItem('tasks');
    this.taskData = tasks ? JSON.parse(tasks) : [];
  }

  private setupRowActions(row: any, data: any) {
    $(row).find(".btn-editar").on("click", (event) => {
    
      this.accionEditar.emit({
        id: this.id = data.id,
        accion: 'editar',
        data: data
      });
      this.accionBoton(this.id, this.modales, 'editar');
    });

    $(row).find(".btn-ver").on("click", (event) => {
      
      this.accionVer.emit({
        data: data
      });
      this.accionBoton(this.id, this.modales, 'ver');
    });
  }

 
  private deleteTask(id: number) {
    this.taskData = this.taskData.filter(task => task.id !== id); // Filtrar la tarea eliminada
    localStorage.setItem('tasks', JSON.stringify(this.taskData)); // Actualizar localStorage
    this.dtTrigger.next(); // Trigger para volver a renderizar la tabla
  }

  private accionBoton(id: number, modal: Array<ModalObject>, tipo: string) {
    const abrirModal = modal?.filter((element) => element.tipo === tipo);
    if (abrirModal && abrirModal.length) {
      const modalToOpen = abrirModal[0];
      
    }
  }

  

  
}
