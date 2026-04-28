import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIcon } from "@angular/material/icon";
import { UserResponseDTO } from '../../../interface/user/user-response';

@Component({
  selector: 'app-navbar',
  imports: [MatIcon, RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  menuItems: any[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dev/dashbord' },
    { icon: 'view_kanban', label: 'kanban', route: '/dev/kanban' },
    
    
   
   
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
