import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from 'src/app/services/forget-password-service.service';

@Component({
  selector: 'app-receive-otp',
  templateUrl: './receive-otp.component.html',
  styleUrls: ['./receive-otp.component.css']
})
export class ReceiveOtpComponent {
  otp: number | undefined;
  email: string = '';

  constructor(
    private route: ActivatedRoute,
    private forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
    });

  }

  onSubmit(form: any) {
    if (form.invalid || this.otp === undefined) {
      this.toastr.error('Please enter a valid OTP');
      return;
    }

    this.forgetPasswordService.verifyOtp(this.email, this.otp).subscribe({
      next: (response: string) => {
        if (response === 'success') {
          this.toastr.success('OTP verified successfully!');
          this.router.navigate(['/new-password'],{ queryParams: { email: this.email } });
        } else {
          this.toastr.error(response || 'Invalid OTP, please try again.');
        }
      },
      error: (error) => {
        console.log('Error response:', error);

        const message = (typeof error.error === 'string') ? error.error.replace(/['"]+/g, '') : '';

        switch (message) {
          case 'OTP expired and Invalid OTP':
            this.toastr.error('Your OTP has expired and is incorrect. Please request a new one.');
            break;
          case 'OTP expired':
            this.toastr.error('Your OTP has expired. Please request a new one.');
            break;
          case 'Invalid OTP':
            this.toastr.error('Invalid OTP. Please try again.');
            break;
          default:
            this.toastr.error(message || 'Something went wrong while verifying OTP!');
            break;
        }



      }

    });
  }

}