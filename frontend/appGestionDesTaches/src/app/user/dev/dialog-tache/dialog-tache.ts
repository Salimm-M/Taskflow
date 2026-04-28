import { Component, Inject } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIcon } from "@angular/material/icon";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { KanbanTask } from '../kanban-task/kanban-task';
import { TaskResponseDTO } from '../../../interface/task/task-response-dto';
import { EPeriorite } from '../../../enums/e-periorite';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../service/task-service';
import { FichierDTO } from '../../../interface/fichier-dto';
import { FichierService } from '../../../service/fichier-service';

@Component({
  selector: 'app-dialog-tache',
  imports: [MatTabsModule, MatIcon,CommonModule],
  templateUrl: './dialog-tache.html',
  styleUrl: './dialog-tache.css',
})
export class DialogTache {

  files: File[] = []; 
  fichierStocke: FichierDTO[] = []; 

  constructor(
    private fichierService: FichierService,
    dialogRef: MatDialogRef<KanbanTask>,
    @Inject(MAT_DIALOG_DATA) public data: TaskResponseDTO
  ) {
    console.log(data);
  }

  ngOnInit() {
    this.afficherFichier(); 
  }

  getPriorityLabel(priority?: string): string {
    switch (priority) {
      case EPeriorite.Faible: return 'Basse';
      case EPeriorite.Moyen: return 'Moyenne';
      case EPeriorite.Haute: return 'Haute';
      default: return 'priority inconnue';
    }
  }

 
  onFilesSelected(event: any) {
    const selectedFiles = Array.from(event.target.files) as File[];
    this.files = [...this.files, ...selectedFiles];
    console.log(this.files);
  }

 
  removeFile(index: number) {
    this.files.splice(index, 1);
  }

 
  uploadFiles() {
    if (this.files.length === 0) return;

    this.fichierService.uploadFile(this.files, this.data.id).subscribe({
      next: (response: any) => {
        console.log('Uploaded:', response);

        this.files = []; 
        this.afficherFichier();
      },
      error: err => console.error(err)
    });
  }

  
  afficherFichier() {
    this.fichierService.getFilesByTask(this.data.id).subscribe({
      next: (response: FichierDTO[]) => {
        this.fichierStocke = response; 
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


}