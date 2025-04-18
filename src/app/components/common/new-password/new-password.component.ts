import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private forgetPasswordService: ForgetPasswordService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSavePassword(form: any) {
    if (form.invalid || this.confirmPassword !== this.newPassword) {
      this.toastr.error('Please fix validation errors.');
      return;
    }

    this.forgetPasswordService.changePassword(this.newPassword).subscribe({
      next: (res) => {
        this.toastr.success('Password updated successfully!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Something went wrong while updating password.');
      },
    });
  }
}
