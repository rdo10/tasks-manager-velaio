import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpersService } from 'src/app/services/helpers.service';
import { TaskService } from '../services/tasks.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [TaskService],
})
export class FormComponent {
  public form: FormGroup;
  public titulo: string = 'Crear Tarea';
  public messages: boolean = false;
  public dropdownList: any[] = [];
  public selectedItems = [];
  public editData = [];
  public showAddPerson: boolean = true;
  private date = new Date();

  //settings for multiselect
  public dropdownSettings = {

    singleSelection: false,
    text: 'Selecciona las Habilidades de la persona',
    selectAllText: 'Seleccionar todo',
    unSelectAllText: 'Desmarcar todo',
    itemsShowLimit: 3,
    allowSearchFilter: true,
  };

  constructor(public fb: FormBuilder, public helpersevices: HelpersService, private taskServices: TaskService, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.createTasks();
    this.getUsers();
    if (this.activeRoute.snapshot.params['id'] != null) {
      this.titulo = 'Editar Tarea'
      const editData = localStorage.getItem('edit data');
      const parsedData = JSON.parse(editData);
      this.edit(parsedData);
    }
  }


  edit(data: any) {
   
    this.clearPersonasAsociadas();

    this.form.patchValue({
      nombre: data.nombre,
      fechaLimite: data.fechaLimite,
      estado: data.estado
    });
  
    data.personasAsociadas.forEach((persona: any) => {
      const personaFormGroup = this.fb.group({
        nombreCompleto: [persona.nombreCompleto, Validators.required],
        edad: [persona.edad, [Validators.required, this.validateAge]],
        habilidades: [persona.habilidades, Validators.required] 
      });
  
      this.personasAsociadas.push(personaFormGroup);
    });
  }
  
  clearPersonasAsociadas() {
    while (this.personasAsociadas.length !== 0) {
      this.personasAsociadas.removeAt(0);
    }
  }
  
  


  guardar() {
    const formValue = this.form.getRawValue();
  
    this.taskServices.saveTask(formValue).subscribe(response => {
      let existingTasks;
      try {
        existingTasks = JSON.parse(localStorage.getItem('tasks')) || []; 
      } catch (error) {
        existingTasks = [];
      }
  
      const taskIndex = existingTasks.findIndex(task => task.nombre === formValue.nombre);

      if (taskIndex !== -1) {
        existingTasks[taskIndex] = formValue;
        
        this.helpersevices.mensajeAlerta('success', 'Registro actualizado con éxito');
      } else {
        existingTasks.push(response);
        this.helpersevices.mensajeAlerta('success', 'Registro guardado con éxito');
      }

      localStorage.setItem('tasks', JSON.stringify(existingTasks));
    });
  }
  
  
  





  getUsers() {
    this.taskServices.getUsers().subscribe((data: any[]) => {
      this.dropdownList = data.map(user => ({
        id: user.id,
        itemName: user.name
      }));
    });
  }

  getCurrentDate(): string {
    return new Date().toISOString().substring(0, 10);
  }



  onItemSelect(item: any) { }
  OnItemDeSelect(item: any) { }
  onSelectAll(items: any) { }
  onDeSelectAll(items: any) { }



  createTasks() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      fechaLimite: [this.getCurrentDate(), Validators.required],
      personasAsociadas: this.fb.array([
        this.createPerson()
      ]),
      estado: ['pendientes', Validators.required]
    });
  }

  addTask(newTask) {

    const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    existingTasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(existingTasks));
  }

  createPerson(): FormGroup {
    return this.fb.group({
      nombreCompleto: ['', Validators.required],
      edad: ['', [Validators.required, this.validateAge]],
      habilidades: [[], Validators.required]
    });
  }

  get personasAsociadas(): FormArray {
    return this.form.get('personasAsociadas') as FormArray;
  }

  agregarPersona() {
    if (this.personasAsociadas.length < 2) {
      this.personasAsociadas.push(this.createPerson());
    }
  }


  eliminarPersona(index: number) {
    this.personasAsociadas.removeAt(index);
  }

  validateAge(control: AbstractControl) {
    const age = control.value;
    if (age && age < 18) {
      return { invalidAge: true };
    }
    return null;

  }


}


