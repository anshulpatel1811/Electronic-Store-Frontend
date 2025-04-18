import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  sendOtp(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${environment.apiUrl}/send-otp`, null, { params, responseType: 'text' });
  }

  verifyOtp(otp: number): Observable<any> {
    const params = new HttpParams().set('otp', otp);
    return this.http.post(`${environment.apiUrl}/verify-otp`, null, { params, responseType: 'text' });
  }

  changePassword(newPassword: string) {
    return this.http.post(`${environment.apiUrl}/change-password`, null, {
      params: {
        newpassword: newPassword
      },
      responseType: 'text' // If your backend returns plain string like "success"
    });
  }

}