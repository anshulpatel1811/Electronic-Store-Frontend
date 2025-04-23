import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { ContactRequest } from 'src/app/models/contact-request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  contact: ContactRequest = {
    name: '',
    email: '',
    message: ''
  };

  constructor(
    private contactService: ContactService,
    private toastr: ToastrService
  ) {}

  sendMessage(form: NgForm) {
    if (form.invalid) {
      this.toastr.warning('Please fill all fields correctly!');
      return;
    }

    this.contactService.sendMessage(this.contact).subscribe({
      next: () => {
        this.toastr.success('Message sent successfully!');
        form.resetForm();
      },
      error: () => {
        this.toastr.error('Something went wrong. Please try again later.');
      }
    });
  }
}
