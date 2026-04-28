import { Component } from '@angular/core';
import { UserResponseDTO } from '../../../interface/user/user-response';
import { ProjetResponseDTO } from '../../../interface/Projet/projet-response-dto';
import { ProjetService } from '../../../service/projet-service';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBar } from "@angular/material/progress-bar";

@Component({
  selector: 'app-mes-projet',
  imports: [MatCardModule, MatProgressBar],
  templateUrl: './mes-projet.html',
  styleUrl: './mes-projet.css',
})
export class MesProjet {
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
    this.serviceProjet.getProjetByDev(this.user.id).subscribe(data=>{
      console.log(data)
     this.p=data
    })

}
}
