import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TaskResponseDTO } from '../../../interface/task/task-response-dto';
import { EStatus } from '../../../enums/e-status';



import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TaskService } from '../../../service/task-service';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { MatIcon } from '@angular/material/icon';
import { differenceInHours } from 'date-fns/fp';
import { EPeriorite } from '../../../enums/e-periorite';
import { CommonModule } from '@angular/common';
import { ProjetService } from '../../../service/projet-service';
import { MatDialog } from '@angular/material/dialog';
import { DialogTache } from '../dialog-tache/dialog-tache';

@Component({
  selector: 'app-kanban-task',
  imports: [MatCardModule,CdkDropList, CdkDrag,MatIcon,CommonModule],
  templateUrl: './kanban-task.html',
  styleUrl: './kanban-task.css',
})
export class KanbanTask implements OnInit {
  toDo: TaskResponseDTO[] = [];
inProgress: TaskResponseDTO[] = [];
inReview: TaskResponseDTO[] = [];
done: TaskResponseDTO[] = [];
  user!: UserResponseDTO;
  tasks!:TaskResponseDTO[];
  constructor(private taskService:TaskService,
    private projetService:ProjetService,private dialog:MatDialog){}
 ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser')!);
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getSubTasksByDev(this.user.id).subscribe(data => {
      console.log(data);
      console.log(this.user)
      this.tasks = data;

      this.destribuer();
    });
  }
  destribuer(){
    this.tasks.forEach(t=>{
      switch (t.status){
        case EStatus.AFaire:
          this.toDo.push(t);
          break;
        case EStatus.EnCours:
          this.inProgress.push(t);
          break;
        case EStatus.Terminee:
          this.done.push(t);
          break;
        case EStatus.aVerifie:
          this.inReview.push(t);
          break;
      }
    })
  }
   drop(event: CdkDragDrop<TaskResponseDTO[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
     
      const task:TaskResponseDTO = event.container.data[event.currentIndex];
      task.status = this.getStatusFromColumn(event.container.id);
      console.log(event.container.id)

      console.log(event.previousContainer.id)
         this.taskService.updateTaskStatus(task.id, task.status).subscribe({
      next: () => this.projetService.ProgresProjet(task.idProjet).subscribe(
        () => {
          
          console.log("Mise à jour réussie");
        }
      ),
      error: (err) => console.error("Erreur update task:", err)
    });
    }
  }
  getStatusFromColumn(columnId: string): EStatus {
    switch (columnId) {
      case 'cdk-drop-list-0':
        return EStatus.AFaire;
      case 'cdk-drop-list-1':
        return EStatus.EnCours;
      case 'cdk-drop-list-2':
        return EStatus.aVerifie;
      case 'cdk-drop-list-3':
        return EStatus.Terminee;
      default:
        return EStatus.AFaire;
    }
  }
getdate(datefin:Date){

  return differenceInHours(new Date(),datefin);
  
}
open(tache:TaskResponseDTO){
  const dialogRef = this.dialog.open(DialogTache, 
    {
      maxHeight: '90vh',
      maxWidth: '90vw',
      
    width: '1200px',
    data: tache
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
getPriorityClass(priority?: EPeriorite) {
  switch (priority) {
    case EPeriorite.Haute:
      return 'priority-high';
    case EPeriorite.Moyen:
      return 'priority-medium';
    case EPeriorite.Faible:
      return 'priority-low';
    default:
      return '';
  }
}
}
