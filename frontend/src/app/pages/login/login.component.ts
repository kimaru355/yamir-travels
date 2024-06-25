import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserLogin } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const user_login: UserLogin = this.loginForm.value;
      this.authService.login(user_login).subscribe((response) => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data.token);
          alert('Sign in successful');
          this.loginForm.reset();
          setTimeout(() => {
            if (response.data?.role === 'admin') {
              this.router.navigate(['/dashboard']);
            } else {
              this.router.navigate(['/']);
            }
          }, 2000);
        } else if (response.message === 'Invalid email or password') {
          alert('Invalid email or password');
        } else {
          alert('An Error Occurred');
        }
      });
    }
  }
}
