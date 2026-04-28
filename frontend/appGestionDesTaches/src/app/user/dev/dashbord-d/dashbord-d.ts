import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { MesProjet } from "../mes-projet/mes-projet";
import { MesTache } from "../mes-tache/mes-tache";

@Component({
  selector: 'app-dashbord-d',
  imports: [MatCardModule, MatIcon, MesProjet, MesTache],
  templateUrl: './dashbord-d.html',
  styleUrl: './dashbord-d.css',
})
export class DashbordD {

}
