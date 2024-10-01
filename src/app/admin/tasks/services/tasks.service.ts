import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.url}tareas`);
  }

  getUsers(){
    return this.http.get(`${environment.url}users`);
  }

  saveTask(task: any) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${environment.url}posts`, task, { headers });
  }

 
}
