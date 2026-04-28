import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-nav-bar',
  imports: [MatIconModule, RouterLink],
  templateUrl: './admin-nav-bar.html',
  styleUrl: './admin-nav-bar.css',
})
export class AdminNavBar {

  menuItems: any[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/admin/dashbord' },
    { icon: 'people', label: 'gestion des utilisateurs', route: '/admin/gestionUtilisateur' },
    { icon: 'assignment', label: 'gestion des taches', route: '/admin/gestionTache' },

    { icon: 'folder', label: 'gestion des projets', route: '/admin/gestionProjet' },
    { icon: 'bar_chart', label: 'Analytics', route: '/analytics' }
  ];

  activeRoute: string = '/dashboard';
  userName: string = 'Admin User';
  userRole: string = 'Admin';

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
