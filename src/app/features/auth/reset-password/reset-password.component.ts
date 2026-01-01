import { Component, inject, signal, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AccountService } from '../../../core/services/account/account.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  form = this.fb.group(
    {
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      token: ['', Validators.required],
      userId: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        token: params['token'],
        userId: params['userId'],
      });
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  // ✅ Error يظهر فقط بعد الكتابة
  hasError(controlName: string, error: string): boolean {
    const control = this.form.get(controlName);
    return !!(
      control &&
      control.hasError(error) &&
      control.dirty
    );
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    this.accountService.resetPassword(this.form.value as any).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.successMessage.set('Password has been reset successfully.');
          setTimeout(() => this.router.navigate(['/auth/login']), 2000);
        } else {
          this.errorMessage.set(
            res.errors?.join(', ') || res.message || 'Failed to reset password.'
          );
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Failed to reset password.'
        );
      }
    });
  }
}
