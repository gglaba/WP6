import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';


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

// api.service.ts
private apiUrl = environment.apiUrl + '/biura-bystrzyca/mail';

  constructor(private http: HttpClient) {}

  sendContactForm(data: ContactRequest): Observable<any> {
    return this.http.post(this.apiUrl, data,{ transferCache: false });
  }
}
