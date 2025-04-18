import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/loginresponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { setLoginData } from 'src/app/store/auth/auth.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  loginData = {
    email: '',
    password: '',
  };

  @ViewChild('captchaCanvas') captchaCanvas!: ElementRef<HTMLCanvasElement>;

  generatedCaptcha: string = '';
  captchaInput: string = '';

  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private store: Store<{ auth: LoginResponse }>,
    private router: Router
  ) {}

  ngAfterViewInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.generatedCaptcha = Array(5).fill('').map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');

    const canvas = this.captchaCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = this.getRandomColor();
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw each character with distortion
    for (let i = 0; i < this.generatedCaptcha.length; i++) {
      const char = this.generatedCaptcha[i];
      ctx.font = `${24 + Math.random() * 8}px Arial`;
      ctx.fillStyle = this.getRandomColor();
      const x = 20 + i * 20;
      const y = 30 + Math.random() * 10;
      const angle = (Math.random() - 0.5) * 0.5; // Rotate randomly

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(char, 0, 0);
      ctx.restore();
    }

    // Add dots (noise)
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = this.getRandomColor();
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  getRandomColor(): string {
    const r = Math.floor(Math.random() * 150);
    const g = Math.floor(Math.random() * 150);
    const b = Math.floor(Math.random() * 150);
    return `rgb(${r},${g},${b})`;
  }

  formSubmitted(event: SubmitEvent) {
    event.preventDefault();
    console.log(this.loginData);
    
    // VALIDATE
    if (
      this.loginData.email.trim() === '' ||
      this.loginData.password.trim() === ''
    ) {
      this.toastr.error('Email and password are required!');
      return;
    }

    if (this.captchaInput.trim().toLowerCase() !== this.generatedCaptcha.toLowerCase()) {
      this.toastr.error('CAPTCHA does not match!');
      this.generateCaptcha(); // Refresh captcha
      this.captchaInput = ''; // Clear input
      return;
    }

    //login api
    this.authService.generateToken(this.loginData).subscribe({
      next: (value: LoginResponse) => {
        console.log(value);
        this.store.dispatch(setLoginData(value));
        this.toastr.success('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.message || 'Login failed. Please try again.');
        this.generateCaptcha(); // Optional: refresh captcha on failed login
      },
    });
  }
}