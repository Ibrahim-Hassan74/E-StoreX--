import { Component, inject, signal, effect, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AccountService } from '../../../../core/services/account/account.service';
import { ImageCropperModalComponent, CropResult } from '../image-cropper-modal/image-cropper-modal.component';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule, ImageCropperModalComponent],
  templateUrl: './profile-info.component.html'
})
export class ProfileInfoComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  currentUser = this.accountService.currentUser;
  isLoading = signal(false);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);
  
  showCropper = signal(false);
  selectedFile = signal<File | null>(null);

  profileForm = this.fb.group({
    displayName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor() {
    effect(() => {
      const user = this.currentUser();
      if (!user) return;

      this.profileForm.patchValue({
        displayName: user.displayName ?? '',
        phoneNumber: user.phoneNumber ?? '',
      });
    });
  }

  onUpdateProfile(): void {
    if (this.profileForm.invalid) return;

    this.handleRequest(
      this.accountService.updateProfile(this.profileForm.value as any),
      'Profile updated successfully.'
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    this.selectedFile.set(file);
    this.showCropper.set(true);
  }

  onCropSave(result: CropResult): void {
    const file = new File([result.blob], this.selectedFile()?.name || 'profile.png', { type: result.blob.type });
    
    this.handleRequest(
      this.accountService.uploadPhoto(file, {
        cropX: result.cropX,
        cropY: result.cropY,
        cropWidth: result.cropWidth,
        cropHeight: result.cropHeight,
        zoom: result.zoom
      }),
      'Photo updated successfully.',
      () => {
        this.closeCropper();
      }
    );
  }

  onCropCancel(): void {
    this.closeCropper();
  }

  private closeCropper(): void {
    this.showCropper.set(false);
    this.selectedFile.set(null);
    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  deletePhoto(): void {
    if (!confirm('Delete profile photo?')) return;

    this.handleRequest(
      this.accountService.deletePhoto(),
      'Photo deleted successfully.'
    );
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
