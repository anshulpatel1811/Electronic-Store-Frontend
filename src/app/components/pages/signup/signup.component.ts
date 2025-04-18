import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  user = new User('', '', '', 'male', '');
  loading = false;

  constructor(
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  formSubmit(event: SubmitEvent, signUpForm: NgForm) {
    event.preventDefault();
  
    if (signUpForm.valid) {
      this.loading = true;
  
      this.userService.signupUser(this.user).subscribe({
        next: (user) => {
          this.toastr.success('User is successfully registered!');
          this.user = new User('', '', '', 'male', '');
          signUpForm.resetForm();
        },
        error: (error) => {
          this.toastr.error('Error in creating user!');
          this.toastr.error('This email might already exist, try another one.');
          console.error(error);
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          console.log('Request completed');
        },
      });
    } else {
      // Mark all controls as touched so validation messages show
      Object.values(signUpForm.controls).forEach(control => {
        control.markAsTouched();
      });
  
      this.toastr.error('Form is not valid!', '', {
        positionClass: 'toast-top-right',
      });
    }
  }
  

  resetForm(signupForm: NgForm) {
    this.user = new User('', '', '', 'male', '');
    signupForm.resetForm();
  }
}
