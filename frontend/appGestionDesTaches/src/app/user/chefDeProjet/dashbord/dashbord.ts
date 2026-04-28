import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { PrjetEnCours } from "../prjet-en-cours/prjet-en-cours";
import { Equipe } from "../equipe/equipe";


@Component({
  selector: 'app-dashbord',
  imports: [MatCardModule, MatIcon, PrjetEnCours, Equipe],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.css',
})
export class Dashbord {

}
