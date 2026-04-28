import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjetService } from '../../service/projet-service';
import { ProjetResponseDTO } from '../../interface/Projet/projet-response-dto';

@Component({
  selector: 'app-active-project',
  imports: [MatCardModule,MatIconModule,MatButtonModule,MatProgressBarModule],
  templateUrl: './active-project.html',
  styleUrl: './active-project.css',
})
export class ActiveProject implements OnInit {
  public p!:ProjetResponseDTO[]
  constructor(private serviceProjet:ProjetService){}
ngOnInit(): void {
  this.serviceProjet.getAllProjets().subscribe(data=>{
   this.p=data
  })
  
}

}
