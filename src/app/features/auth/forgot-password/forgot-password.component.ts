import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../core/services/account/account.service';
import { LucideAngularModule } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, LucideAngularModule],
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  // ✅ Error يظهر فقط بعد الكتابة
  hasError(error: string): boolean {
    const control = this.form.get('email');
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

    this.accountService.forgotPassword(this.form.value.email!).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        if (res.success) {
          this.successMessage.set(
            res.message || 'Check your email for instructions.'
          );
        } else {
          this.errorMessage.set(res.message || 'Failed to send reset link.');
        }
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err.error?.message || 'Failed to send reset link.'
        );
      }
    });
  }
}
