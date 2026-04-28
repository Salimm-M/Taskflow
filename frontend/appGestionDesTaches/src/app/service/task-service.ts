import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskResponseDTO } from '../interface/task/task-response-dto';
import { TaskCreateDTO } from '../interface/task/task-create-dto';
import { TaskUpdateDTO } from '../interface/task/task-updtate';
import { EStatus } from '../enums/e-status';
import { FichierDTO } from '../interface/fichier-dto';
import { TaskTreeNode } from '../interface/task/task-tree-node';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private url: string = 'http://localhost:8082/api/tasks';

  constructor(private http: HttpClient) {}

  
  getAllTasks(): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(this.url);
  }
   getTasksByProjet(projetId:number): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(`${this.url}/projet/${projetId}/principales`);
  }
  
 getSubTasksByTask(TaskId:number): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(`${this.url}/${TaskId}/subtasks`);
  }
 getSubTasksByDev(TaskId:number): Observable<TaskResponseDTO[]> {
    return this.http.get<TaskResponseDTO[]>(`${this.url}/developpeur/${TaskId}`);
  }

  
  getTaskById(id: number): Observable<TaskResponseDTO> {
    return this.http.get<TaskResponseDTO>(`${this.url}/${id}`);
  }

  
  createTask(task: TaskCreateDTO): Observable<TaskResponseDTO> {
    return this.http.post<TaskResponseDTO>(this.url, task);
  }

  
  updateTask(id: number, task: TaskUpdateDTO): Observable<TaskUpdateDTO> {
    return this.http.put<TaskUpdateDTO>(`${this.url}/${id}`, task);
  }

  getTreeTasks(projetId: number=1): Observable<TaskTreeNode[]> {
    return this.http.get<TaskTreeNode[]>(`${this.url}/tree/${projetId}`);
  }

  
  deleteTask(id: number): Observable<void> {
    console.log('Deleting task with id:', id);
    return this.http.delete<void>(`${this.url}/${id}`);
  }
updateTaskStatus(id: number, status: EStatus): Observable<TaskResponseDTO> {
  return this.http.put<TaskResponseDTO>(
    `${this.url}/${id}/${status}`, 
    {}
  );
}
getTaskParent(id: number): Observable<TaskResponseDTO[]> {
  return this.http.get<TaskResponseDTO[]>(`${this.url}/projet/${id}/principales`);
}
getChildByParent(id: number): Observable<TaskResponseDTO[]> {
  return this.http.get<TaskResponseDTO[]>(`${this.url}/${id}/subtasks`);
}
getTaskByChef(idChef: number): Observable<TaskResponseDTO[]> {
  return this.http.get<TaskResponseDTO[]>(`${this.url}/chef/${idChef}`);


}
}