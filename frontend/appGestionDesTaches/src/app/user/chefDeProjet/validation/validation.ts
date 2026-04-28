import { Component, ViewChild } from '@angular/core';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { UserService } from '../../../service/user-service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../../service/task-service';
import { CommonModule, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { TaskValidation } from '../../../interface/task-validation';
import { de } from 'date-fns/locale';
import { FichierService } from '../../../service/fichier-service';
import { FichierDTO } from '../../../interface/fichier-dto';
import { EStatus } from '../../../enums/e-status';
import { DialogRefus } from '../dialog-refus/dialog-refus';
import { TaskResponseDTO } from '../../../interface/task/task-response-dto';
import { EmailService } from '../../../service/email-service';
import { MessageRefus } from '../../../interface/message-refus';

@Component({
  selector: 'app-validation',
  imports: [
     NgClass,
     CommonModule
     ,
    
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,],
  templateUrl: './validation.html',
  styleUrl: './validation.css',
})
export class Validation {
@ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ["titre", "developpeur", "periorite", "dateModification"];
  dataSource!: MatTableDataSource<TaskValidation>;
  selectedTask!: TaskValidation;

  colors: string[] = ["avatar-green", "avatar-purple", "avatar-cyan", "avatar-blue", "avatar-orange"];
  userColors: Map<number, string> = new Map();
  tasks: TaskValidation[] = [];
  constructor(private emailService: EmailService, private dialog: MatDialog, private fichierService: FichierService, private taskService: TaskService, private userService: UserService) {}
user!: UserResponseDTO;
  ngOnInit(): void {
      this.user = JSON.parse(localStorage.getItem('currentUser')!);
    
    this.loadTasks();
    console.log(this.tasks);
  }

staticFiles: FichierDTO[] = [];
selectTask(row: any) {
  this.selectedTask = row;
  this.afficherFichier();

}
 loadTasks(): void {
  this.tasks = [];

  this.taskService.getTaskByChef(this.user.id).subscribe((tasks) => {

    let loaded = 0;

    tasks.forEach(task => {

      this.userService.getUserById(task.idDeveloppeur).subscribe(dev => {

        let taskValidation: TaskValidation = {
          id: task.id,
          titre: task.titre,
          description: task.description,
          status: task.status,
          progress: task.progress,
          periorite: task.periorite,
          emailDev: dev.email,
          idDeveloppeur: task.idDeveloppeur,
          idProjet: task.idProjet,
          dateFin: task.dateFin,
          dateCreation: task.dateCreation,
          dateModification: task.dateModification,
          nomDevloppeur: dev.nom,
          prenomDeveloppeur: dev.prenom,
          photo: dev.photo  || '',
        };
        console.log(taskValidation.nomDevloppeur)

        this.tasks.push(taskValidation);

        loaded++;

                
console.log(this.tasks);
        if (loaded === tasks.length) {
          console.log("All tasks loaded");
          
          this.dataSource = new MatTableDataSource<TaskValidation>(this.tasks);
          this.dataSource.paginator = this.paginator;
        }

      });

    });

  });
          
console.log(this.tasks);
console.log("data  :"+this.dataSource);
}

  applyFilter(filter: HTMLInputElement) {
    const filterValue = filter.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getColor(userId: number): string {
    return this.userColors.get(userId) || 'avatar-blue';
  }

  afficherFichier() {
    this.fichierService.getFilesByTask(this.selectedTask.id).subscribe({
      next: (response: FichierDTO[]) => {
        this.staticFiles = response; 
      },
      error: err => console.error(err)
    });
  }
   downloadFile(file: FichierDTO) {
    this.fichierService.getFileById(file.id!).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.nom || 'file';
      a.click();
    });
  }

  approverTask() {
    this.taskService.updateTaskStatus(this.selectedTask.id, EStatus.Terminee).subscribe({
      next: (response) => {
        console.log('Task approved:', response);
        this.selectedTask=null!;
        this.loadTasks(); 
      },
      error: err => console.error(err)
    });


  }
  rejeter(){
      this.taskService.updateTaskStatus(this.selectedTask.id, EStatus.EnCours).subscribe({
        next: (response) => {
          console.log('Task rejected:', response);
          this.selectedTask=null!;
          this.loadTasks(); 
        },
        error: err => console.error(err)
      });
  }
 openRefusDialog() {
  const task = this.selectedTask;

  const dialogRef = this.dialog.open(DialogRefus, {
    width: '400px',
    data: { task }
  });

  dialogRef.afterClosed().subscribe(reason => {
    if (reason && task) {
      this.sendReject(task, reason);
    }
  });
}
 sendReject(task: TaskValidation, reason: string) {

  const dto: MessageRefus = {
    email: task.emailDev,
    nomDev: task.prenomDeveloppeur + ' ' + task.nomDevloppeur,
    taskTitle: task.titre,
    reason: reason
  };

  alert("Mise à jour du statut...");

  
  this.taskService.updateTaskStatus(task.id, EStatus.EnCours).subscribe({

    next: () => {

      alert("Statut mis à jour, envoi de l'email...");
          this.selectedTask = null!;
          this.loadTasks();
    
      this.emailService.sendRefusEmail(dto).subscribe({
        next: () => {
          alert('Email envoyé avec succès ');

          
        },

        error: () => {
          alert('Erreur lors de l envoi de l email ');
        }
      });
    },

    error: () => {
      alert('Erreur lors de la mise à jour du statut ❌');
    }

  });
}
}
