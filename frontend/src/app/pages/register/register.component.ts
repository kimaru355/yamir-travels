import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
        ],
        country: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const user_register: UserRegister = this.registerForm.value;
      delete user_register.confirmPassword;
      this.authService.register(user_register).subscribe((response) => {
        if (response.success && response.data) {
          localStorage.setItem('token', response.data.token);
          alert('Registration successful');
          this.registerForm.reset();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        } else if (
          response.message === 'Email or Phone Number already in use'
        ) {
          alert('Email or Phone Number already in use');
        } else {
          alert('An Error Occurred');
        }
      });
    } else {
      console.log('Form not valid');
    }
  }
}
