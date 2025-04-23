import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from 'src/app/services/forget-password-service.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  email: string = '';

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(form: any) {
    if (form.invalid) {
      this.toastr.error('Please enter a valid email');
      return;
    }

    this.forgetPasswordService.sendOtp(this.email).subscribe({
      next: (res: any) => {
        console.log('Response from backend:', res); // Log to check the response
        if (res === 'success') {
          this.toastr.success('OTP sent successfully!');
          this.router.navigate(['/receive-otp'],{ queryParams: { email: this.email } });
        }
      },
      error: (err) => {
        if (err.status === 404 && err.error === 'User not found with this email') {
          this.toastr.error('User not found with this email!');
        } else {
          this.toastr.error('Something went wrong!');
        }
      }
    });
  }


}