import { Component, signal, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Login } from "./login/login";
import { PrjetEnCours } from "./user/chefDeProjet/prjet-en-cours/prjet-en-cours";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Login, PrjetEnCours],
  templateUrl: './app.html',
  styleUrl: './app.css',
   encapsulation: ViewEncapsulation.None,
})
export class App {
  protected readonly title = signal('appGestionDesTaches');
}
