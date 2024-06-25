import { Component } from '@angular/core';
import { UserDetails, UserPasswords } from '../../interfaces/auth';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userDetails!: UserDetails;
  userPasswords: UserPasswords = {
    old_password: '',
    new_password: '',
    confirm_password: '',
  };
  token: string = localStorage.getItem('token') || '';
  detailsForm: FormGroup;
  passwordForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.getUserDetails();
    this.detailsForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10,15}$')],
      ],
      country: ['', Validators.required],
    });
    this.passwordForm = this.fb.group(
      {
        oldPassword: ['', [Validators.required, Validators.minLength(6)]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  getUserDetails() {
    if (!this.token) {
      return;
    }
    this.userService.getUserDetails().subscribe((response) => {
      if (response.success && response.data) {
        this.userDetails = response.data;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  onDetailsSubmit() {
    if (this.detailsForm.valid) {
      this.authService.updateDetails(this.userDetails).subscribe((response) => {
        if (response.success) {
          alert('Details updated successfully');
          this.getUserDetails();
        } else if (
          response.message === 'Email or Phone Number already in use'
        ) {
          alert('Email or Phone Number already in use');
        } else if (response.message === 'Invalid or expired token') {
          alert('Session Expired. Please login again.');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        } else {
          alert('An Error Occurred');
        }
      });
    }
  }

  onPasswordSubmit() {
    if (this.detailsForm.valid) {
      if (
        this.userPasswords.new_password !== this.userPasswords.confirm_password
      ) {
        return;
      }
      this.authService
        .updatePassword(this.userPasswords)
        .subscribe((response) => {
          if (response.success) {
            alert('Password updated successfully');
          } else if (response.message === 'Incorrect password') {
            alert('Incorrect password');
          } else {
            alert('An Error Occurred');
          }
        });
    }
  }
}
