import { Component, OnInit } from '@angular/core';
import { ProjetResponseDTO } from '../../../interface/Projet/projet-response-dto';
import { ProjetService } from '../../../service/projet-service';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatDialog } from '@angular/material/dialog';
import { TabProjetDialogue } from '../tab-projet-dialogue/tab-projet-dialogue';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projet',
  imports: [MatProgressBar,CommonModule],
  templateUrl: './projet.html',
  styleUrl: './projet.css',
})
export class Projet implements OnInit{
  projets!:ProjetResponseDTO[]
  
  constructor(private projetService:ProjetService, private dialog: MatDialog){}
  user!:UserResponseDTO;
       loadTasksFromLocalStorage() {
        const data = localStorage.getItem('currentUser');
        
        if (data) {
          this.user = JSON.parse(data);
        }}
  ngOnInit(): void {
    this.loadTasksFromLocalStorage()
    this.projetService.getProjetByChef(this.user.id).subscribe(data=>{
      this.projets=data
    })
  }
openUpdateDialog(user: ProjetResponseDTO): void {
  const dialogRef = this.dialog.open(TabProjetDialogue, { 
    width: '900px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    panelClass: 'custom-dialog-container',
    data: { ...user },
    disableClose: false, 
    autoFocus: true
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    
      console.log('Dialog result:', result);
 
    }
  });
}

}
