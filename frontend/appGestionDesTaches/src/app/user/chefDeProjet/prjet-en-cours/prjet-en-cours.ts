import { Component, OnInit } from '@angular/core';
import { ProjetResponseDTO } from '../../../interface/Projet/projet-response-dto';
import { ProjetService } from '../../../service/projet-service';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserResponseDTO } from '../../../interface/user/user-response';

@Component({
  selector: 'app-prjet-en-cours',
   imports: [MatCardModule,MatIconModule,MatButtonModule,MatProgressBarModule],
  templateUrl: './prjet-en-cours.html',
  styleUrl: './prjet-en-cours.css',
})
export class PrjetEnCours implements OnInit {
    public p!:ProjetResponseDTO[]
    constructor(private serviceProjet:ProjetService){}
      user!:UserResponseDTO;
     loadTasksFromLocalStorage() {
      const data = localStorage.getItem('currentUser');
      
      if (data) {
        this.user = JSON.parse(data);
      }}
  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
    this.serviceProjet.getProjetByChef(this.user.id).subscribe(data=>{
      console.log(data)
     this.p=data
    })

}
}
