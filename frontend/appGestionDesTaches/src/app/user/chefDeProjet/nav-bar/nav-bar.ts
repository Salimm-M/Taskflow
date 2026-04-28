import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { UserResponseDTO } from '../../../interface/user/user-response';

@Component({
  selector: 'app-nav-bar',
  imports: [MatIcon, RouterLink],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {
  menuItems: any[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/chef/dashbord' },
    { icon: '', label: 'projet', route: '/chef/projet' },
    { icon: 'people', label: 'equipe', route: '/chef/equipe' },
 
   
  ];

  activeRoute: string = '/dashboard';
  user!:UserResponseDTO;
 loadTasksFromLocalStorage() {
  const data = localStorage.getItem('currentUser');
  if (data) {
    this.user = JSON.parse(data);
  }}
  ngOnInit(): void {
    this.loadTasksFromLocalStorage();
  }
  constructor(private router: Router) {
    this.activeRoute = this.router.url;
  }

  navigateTo(route: string): void {
    this.activeRoute = route;
    this.router.navigate([route]);
  }

  isActive(route: string): boolean {
    return this.activeRoute === route;
  }

  signOut(): void {
    console.log('Signing out...');
    this.router.navigate(['/login']);
  }

}
