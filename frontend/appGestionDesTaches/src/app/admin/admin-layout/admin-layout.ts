import { Component } from '@angular/core';
import { AdminNavBar } from "../admin-nav-bar/admin-nav-bar";
import { RouterOutlet } from '@angular/router';
import { AdminDashbord } from "../../admin-dashbord/admin-dashbord";
import { ActiveProject } from "../../component/active-project/active-project";
import { HttpClientModule } from '@angular/common/http';
import { GestionUser } from "../gestion-user/gestion-user";
import { GestionDeTache } from "../gestion-de-tache/gestion-de-tache";
import { GestionProjet } from "../gestion-projet/gestion-projet";

@Component({
  selector: 'app-admin-layout',
  imports: [AdminNavBar, RouterOutlet, HttpClientModule, AdminDashbord, ActiveProject, GestionUser, GestionDeTache, GestionProjet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

}
