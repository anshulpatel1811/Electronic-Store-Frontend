import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ForgetPasswordService } from 'src/app/services/forget-password-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-receive-otp',
  templateUrl: './receive-otp.component.html',
  styleUrls: ['./receive-otp.component.css']
})
export class ReceiveOtpComponent {

  otp: number | undefined;

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(form: any) {
    // Check if otp is valid (i.e. not undefined and is a number)
    if (form.invalid || this.otp === undefined) {
      this.toastr.error('Please enter a valid OTP');
      return;
    }

    // Verify the OTP by passing a number (not undefined)
    this.forgetPasswordService.verifyOtp(this.otp).subscribe({
      next: (response: string) => {
        if (response === 'success') {
          this.toastr.success('OTP verified successfully!');
          this.router.navigate(['/new-password']);
        } else {
          this.toastr.error(response || 'Invalid OTP, please try again.');
        }
      },
      error: (error) => {
        console.error(error);
        this.toastr.error('Something went wrong while verifying OTP!');
      }
    });
  }
}
