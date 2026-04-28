import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FichierDTO } from '../interface/fichier-dto';
import { Observable } from 'rxjs';
import { UserResponseDTO } from '../interface/user/user-response';

@Injectable({
  providedIn: 'root',
})
export class FichierService {
    private url: string = 'http://localhost:8082/api/fichier';

  constructor(private http: HttpClient) {}
    uploadFile(file: File[], idTache: number): Observable<FichierDTO[]> {
  const formData = new FormData();

  file.forEach(f => formData.append('files', f));
  formData.append('idTache', idTache.toString());

  return this.http.post<FichierDTO[]>(this.url, formData);
}

getFilesByTask(idTache: number): Observable<FichierDTO[]> {
  return this.http.get<FichierDTO[]>(`${this.url}/Task/${idTache}`);
}
getFileById(id: number): Observable<File> {
  return this.http.get<File>(`${this.url}/${id}`, { responseType: 'blob' as 'json' });
}

}
