import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForgetPasswordService } from 'src/app/services/forget-password-service.service';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css'],
})
export class NewPasswordComponent {
  newPassword: string = '';
  confirmPassword: string = '';
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

  onSavePassword(form: any) {
    if (form.invalid || this.confirmPassword !== this.newPassword) {
      this.toastr.error('Please fix validation errors.');
      return;
    }

    this.forgetPasswordService.changePassword(this.email, this.newPassword).subscribe({
      next: (res) => {
        this.toastr.success('Password changed successfully!');
        this.router.navigate(['/login']);
      },
      error: () => {
        this.toastr.error('Something went wrong!');
      }
    });
  }
}
