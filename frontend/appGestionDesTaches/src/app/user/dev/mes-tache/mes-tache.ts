import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../../service/task-service';
import { TaskResponseDTO } from '../../../interface/task/task-response-dto';
import { UserResponseDTO } from '../../../interface/user/user-response';

@Component({
  selector: 'app-mes-tache',
  imports: [],
  templateUrl: './mes-tache.html',
  styleUrl: './mes-tache.css',
})
export class MesTache implements OnInit{
  constructor(private serviceTask:TaskService){}
  myTasks!:TaskResponseDTO[]
    user!:UserResponseDTO;
       loadTasksFromLocalStorage() {
        const data = localStorage.getItem('currentUser');
        console.log(data)
        if (data) {
          this.user = JSON.parse(data);
        }}
ngOnInit(): void {
  this.loadTasksFromLocalStorage() 
  this.serviceTask.getSubTasksByDev(this.user.id).subscribe(data=>{
    this.myTasks=data
  })
  
}
}
