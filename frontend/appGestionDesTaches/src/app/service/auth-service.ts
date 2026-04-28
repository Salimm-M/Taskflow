import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponseDTO } from '../interface/user/user-response';
import { ERole } from '../enums/e-role';
import { HttpClient } from '@angular/common/http';
import { Connexion } from '../interface/connexion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class 



AuthService {

  constructor(private router: Router,private http: HttpClient) { }
  private url: string = 'http://localhost:8082/api/users';

  connexionSession(user:Connexion):Observable<boolean>{
     return this.http.post<boolean>(`${this.url}/connexionS`, user, { withCredentials: true });
  }

  login(user: UserResponseDTO) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') != null;
  }

  isAdmin(): boolean {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === ERole.admin;
  }
  isChefDeProjet(): boolean {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === ERole.CHEF_DE_PROJET;
  }
  isDev(): boolean {

    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === ERole.DEVLOPPEUR;
  }
}
