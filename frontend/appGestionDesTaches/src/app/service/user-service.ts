import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../interface/user/user-response';
import { UserUpdateByAdminDTO } from '../interface/user/user-update-byadmin';
import { UserCreateDTO } from '../interface/user/user-create';
import { Connexion } from '../interface/connexion';
import { UserUpdateDTO } from '../interface/user/user-update';
import { ChangePassword } from '../interface/user/change-password';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = 'http://localhost:8082/api/users';

  constructor(private http: HttpClient) {}
getDevByproject(id:number):Observable<UserResponseDTO[]>{
  return this.http.get<UserResponseDTO[]>(`${this.url}/projet/dev/${id}`);
}
  getAllUsers(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(this.url);
  }
    updateUser(id: number, user: UserUpdateByAdminDTO): Observable<UserUpdateByAdminDTO> {
    return this.http.put<UserUpdateByAdminDTO>(`${this.url}/admin/${id}`, user);
  }
  updateUser1(id: number, user: UserUpdateDTO): Observable<UserUpdateDTO> {
    return this.http.put<UserUpdateDTO>(`${this.url}/${id}`, user);
  }
  uploadPhoto(id: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  return this.http.post(
    `http://localhost:8082/api/users/${id}/photo`,
    formData,
    { responseType: 'text' }   
  );
}
changePassword(id:number, passwordChange:ChangePassword):Observable<boolean>{

  return this.http.post<boolean>(`${this.url}/${id}/password`, passwordChange);
  }

  deleteUser(id: number): Observable<void> {
    console.log("supp")
    return this.http.delete<void>(`${this.url}/${id}`);
  }
    createUser(user: UserCreateDTO): Observable<UserCreateDTO> {
    return this.http.post<UserCreateDTO>(this.url, user);
  }
  
  getByEmail(email:string):Observable<UserResponseDTO>{
    return this.http.get<UserResponseDTO>(`${this.url}/${email}/user`)
  }
  getByChef(id:number):Observable<UserResponseDTO[]>{
    return this.http.get<UserResponseDTO[]>(`${this.url}/projet/chef/${id}`)

  }
  getUserById(id?: number|null): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.url}/${id}`);
  }
}
