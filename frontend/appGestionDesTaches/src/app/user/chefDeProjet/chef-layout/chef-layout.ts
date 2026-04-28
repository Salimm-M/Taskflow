import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "../nav-bar/nav-bar";
import { Dashbord } from "../dashbord/dashbord";

@Component({
  selector: 'app-chef-layout',
  imports: [RouterOutlet, NavBar, Dashbord],
  templateUrl: './chef-layout.html',
  styleUrl: './chef-layout.css',
})
export class ChefLayout {

}
