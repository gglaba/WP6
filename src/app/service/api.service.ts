import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';


export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  contactByEmail: boolean;
  contactByPhone: boolean;
  subject: string;
  message: string;
  selectedRooms: number[];
  website?: string; // pole honeypot
  rodoConsent: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:5247/biura-bystrzyca/mail';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, data,{ transferCache: false });
  }
}
