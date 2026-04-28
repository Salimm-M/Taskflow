import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from "@angular/material/icon";
import { ActiveProject } from "../component/active-project/active-project";
import { Team } from "../component/team/team";

@Component({
  selector: 'app-admin-dashbord',
  imports: [MatCardModule, MatIcon, ActiveProject, Team],
  templateUrl: './admin-dashbord.html',
  styleUrl: './admin-dashbord.css',
})
export class AdminDashbord {

}
