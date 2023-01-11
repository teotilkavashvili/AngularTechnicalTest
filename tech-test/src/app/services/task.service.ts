import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.baseUrl;
  
  constructor(
    private http: HttpClient,
  ) { }

  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(
      `${this.baseUrl}/tasks`
    );
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(
      `${this.baseUrl}/tasks`, task
    );
  }

  public deleteTask(id: number): Observable<Task[]> {
    return this.http.delete<Task[]>(
      `${this.baseUrl}/tasks/${id}`
    );
  }

  public editTask(task?: Task): Observable<Task> {
    return this.http.patch<Task>(
      `${this.baseUrl}/tasks/${task.id}`, task
    );
  }

  

  

}
