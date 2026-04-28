import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { NavBar } from '../../chefDeProjet/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavBar, Navbar, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
