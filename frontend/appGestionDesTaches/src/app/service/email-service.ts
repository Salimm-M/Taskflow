import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageRefus } from '../interface/message-refus';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private apiUrl = 'http://localhost:8082/api/email';

  constructor(private http: HttpClient) {}

  sendRefusEmail(dto: MessageRefus) {
    return this.http.post<{message: string}>(`${this.apiUrl}/refus-tache`, dto);
  }
}