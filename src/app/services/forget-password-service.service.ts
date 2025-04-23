import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  // Send OTP to given email
  sendOtp(email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.post(`${environment.apiUrl}/send-otp`, null, {
      params,
      responseType: 'text'
    });
  }

  // Verify OTP for specific email
  verifyOtp(email: string, otp: number): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('otp', otp);

    return this.http.post(`${environment.apiUrl}/verify-otp`, null, {
      params,
      responseType: 'text'
    });
  }

  // Change password for the email (assumes email is stored/managed separately after verification)
  changePassword(email: string, newPassword: string): Observable<any> {
    const params = new HttpParams()
      .set('email', email)
      .set('newpassword', newPassword);

    return this.http.post(`${environment.apiUrl}/change-password`, null, {
      params,
      responseType: 'text'
    });
  }

}