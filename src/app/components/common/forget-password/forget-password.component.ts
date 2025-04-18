import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/forget-password-service.service';
import { ToastrService } from 'ngx-toastr';

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
    if (form.invalid) return;

    this.forgetPasswordService.sendOtp(this.email).subscribe({
      next: (response: string) => {
        if (response.includes('User not exists')) {
          this.toastr.error('User not found with this email ID!');
        } else {
          console.log(response);
          this.toastr.success('OTP sent to your email!');
          this.router.navigate(['/receive-otp']);
        }
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Something went wrong while sending OTP!');
      }
    });
  }
}
