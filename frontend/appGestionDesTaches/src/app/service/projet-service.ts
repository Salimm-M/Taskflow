import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjetResponseDTO } from '../interface/Projet/projet-response-dto';
import { ProjetCreateDTO } from '../interface/Projet/projet-create-dto';
import { ProjetUpdateDTO } from '../interface/Projet/projet-update-dto';
import { UserResponseDTO } from '../interface/user/user-response';

@Injectable({
  providedIn: 'root',
})
export class ProjetService {
  private url: string = 'http://localhost:8082/api/projets';

  constructor(private http: HttpClient) {}

  getAllProjets(): Observable<ProjetResponseDTO[]> {
    return this.http.get<ProjetResponseDTO[]>(this.url);
  }

  getProjetById(id: number): Observable<ProjetResponseDTO> {
    return this.http.get<ProjetResponseDTO>(`${this.url}/${id}`);
  }

  createProjet(projet: ProjetCreateDTO): Observable<ProjetCreateDTO> {
    return this.http.post<ProjetCreateDTO>(this.url, projet);
  }

  updateProjet(id: number, projet: ProjetUpdateDTO): Observable<ProjetUpdateDTO> {
    return this.http.put<ProjetUpdateDTO>(`${this.url}/${id}`, projet);
  }

  deleteProjet(id: number): Observable<void> {
    console.log('supp projet');
    return this.http.delete<void>(`${this.url}/${id}`);
  }
    getProjetByChef(id: number): Observable<ProjetResponseDTO[]> {
    return this.http.get<ProjetResponseDTO[]>(`${this.url}/chef/${id}`);
  }
   getProjetByDev(id: number): Observable<ProjetResponseDTO[]> {
    return this.http.get<ProjetResponseDTO[]>(`${this.url}/developpeur/${id}`);
  }
   ProgresProjet(id: number): Observable<void> {

    return this.http.post<void>(`${this.url}/${id}/avancement`, {});
  }
  getEquipeById(id: number): Observable<UserResponseDTO[] > {
  return this.http.get<UserResponseDTO[]>(`${this.url}/equipe/${id}`);
}
 addUserToProject(projectId: number, userId: number) {
    return this.http.post(
      `${this.url}/${projectId}/users/${userId}`,
      {}
    );
  }

}
