import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ContactRequest } from '../models/contact-request';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendMessage(contact: ContactRequest) {
    return this.http.post(`${environment.apiUrl}/contacts`, contact);
  }
}
