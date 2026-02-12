import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { AccountService } from '../../../../core/services/account/account.service';
import { UiFeedbackService } from '../../../../core/services/ui-feedback.service';

@Component({
  selector: 'app-security-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './security-settings.component.html'
})
export class SecuritySettingsComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private ui = inject(UiFeedbackService);

  isLoading = signal(false);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  changePasswordForm = this.fb.group(
    {
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  private passwordMatchValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.get('newPassword')?.value;
    const confirm = control.get('confirmNewPassword')?.value;

    if (!password || !confirm) return null;
    return password !== confirm ? { passwordMismatch: true } : null;
  }

  onChangePassword(): void {
    if (this.changePasswordForm.invalid) return;

    const user = this.accountService.currentUser();
    const userId = user?.id;

    const requestData = {
      ...this.changePasswordForm.value,
      userId: userId
    };

    this.handleRequest(
      this.accountService.changePassword(requestData as any),
      'Password updated successfully.',
      () => {
        this.changePasswordForm.reset();
        this.ui.successPopup('Password updated successfully. You will be logged out now.').then(() => {
          this.accountService.logout().subscribe(() => {
             location.reload(); 
          });
        });
      }
    );
  }

  deleteAccount(): void {
    this.ui.confirm('Are you sure you want to delete your account? This action cannot be undone.', 'Delete Account', 'Delete', 'Cancel', 'warning')
      .then((confirmed) => {
        if (!confirmed) return;

        this.isLoading.set(true);
        this.message.set(null);
        this.errorMessage.set(null);

        this.accountService.deleteAccount().subscribe({
          next: () => {
             this.ui.successPopup('Your account has been deleted successfully.').then(() => {
                location.reload();
             });
          },
          error: (err) => {
            this.isLoading.set(false);
            this.errorMessage.set(
              err?.error?.message || 'Failed to delete account.'
            );
          },
        });
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
