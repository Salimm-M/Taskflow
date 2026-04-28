import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EPeriorite } from '../../enums/e-periorite';
import { TaskCreateDTO } from '../../interface/task/task-create-dto';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { TaskService } from '../../service/task-service';
import { ProjetService } from '../../service/projet-service';
import { ProjetResponseDTO } from '../../interface/Projet/projet-response-dto';
import { UserService } from '../../service/user-service';
import { UserResponseDTO } from '../../interface/user/user-response';
import { ERole } from '../../enums/e-role';
import { TaskResponseDTO } from '../../interface/task/task-response-dto';
@Component({
  selector: 'app-create-task-dialog-component',
   standalone: true,
  imports: [MatSlideToggleModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './create-task-dialog-component.html',
  styleUrl: './create-task-dialog-component.css',
})
export class CreateTaskDialogComponent implements OnInit{

  periorites = Object.values(EPeriorite);
  isChecked:boolean=false

  task: TaskCreateDTO = {
    titre: '',
    description: '',
    progress: 0,
    periorite: EPeriorite.Moyen,
    idProjet:null,
    idParentTask:  null, 
  idDeveloppeur:  null
  };
  projets!:ProjetResponseDTO[];
  devs!:UserResponseDTO[]
  tasks!:TaskResponseDTO[]


  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    private taskService:TaskService,
    private serviceProjet:ProjetService,
    private userService:UserService
  ) {}
  ngOnInit(): void {
    this.serviceProjet.getAllProjets().subscribe(data=>{
      this.projets=data
    }
    )
    
  }
   loadTasksByProjet(): void {
    console.log(this.task)
    if (this.task.idProjet) {
      this.taskService.getTasksByProjet(this.task.idProjet).subscribe(data => {
        this.tasks = data;
        console.log(this.tasks)

      });
    }
  }
  
  onToggleChange(event: any): void {
    if (event.checked) {
     this.userService.getAllUsers().subscribe(data => {
  this.devs = data.filter(user => user.role === ERole.DEVLOPPEUR);
});

    } else {
      
      this.loadTasksByProjet();
    }
  }
  

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.task);
  }
  onProjetChange(): void {
    if (!this.isChecked) {
      this.loadTasksByProjet();
      console.log("test")
    }}
  
}
