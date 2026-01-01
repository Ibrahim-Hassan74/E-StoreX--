import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccountService } from '../../../../core/services/account/account.service';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './security-settings.component.html'
})
export class SecuritySettingsComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  isLoading = signal(false);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  changePasswordForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirm = control.get('confirmPassword')?.value;

    if (!password || !confirm) return null;
    return password !== confirm ? { passwordMismatch: true } : null;
  }

  onChangePassword(): void {
    if (this.changePasswordForm.invalid) return;

    this.handleRequest(
      this.accountService.changePassword(this.changePasswordForm.value as any),
      'Password updated successfully.',
      () => this.changePasswordForm.reset()
    );
  }

  deleteAccount(): void {
    if (!confirm('Are you sure you want to delete your account?')) return;

    this.isLoading.set(true);
    this.message.set(null);
    this.errorMessage.set(null);

    this.accountService.deleteAccount().subscribe({
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Failed to delete account.'
        );
      },
      // Success redirection handled by auth guard / service typically
    });
  }

  private handleRequest(
    request$: any,
    successMessage: string,
    callback?: () => void
  ): void {
    this.isLoading.set(true);
    this.message.set(null);
    this.errorMessage.set(null);

    request$.subscribe({
      next: (res: any) => {
        this.isLoading.set(false);

        if (res?.success === false) {
          this.errorMessage.set(res.message || 'Operation failed.');
          return;
        }

        this.message.set(successMessage);
        callback?.();
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(
          err?.error?.message || 'Operation failed.'
        );
      },
    });
  }
}
