import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../../../core/services/account/account.service';

@Component({
  selector: 'app-address-info',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-info.component.html'
})
export class AddressInfoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);

  isLoading = signal(false);
  isFetching = signal(true);
  message = signal<string | null>(null);
  errorMessage = signal<string | null>(null);

  addressId = signal<string | null>(null);

  addressForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    city: ['', Validators.required],
    street: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required],
  });

  ngOnInit(): void {
    this.loadAddress();
  }

  private loadAddress(): void {
    this.isFetching.set(true);

    this.accountService.getAddress().subscribe({
      next: (address) => {
        this.isFetching.set(false);
        if (address) {
          this.addressId.set(address.id);
          this.addressForm.patchValue(address);
        }
      },
      error: () => this.isFetching.set(false),
    });
  }

  onUpdateAddress(): void {
    if (this.addressForm.invalid) return;

    const payload = {
      id: this.addressId(),
      ...this.addressForm.value
    };

    this.handleRequest(
      this.accountService.updateAddress(payload as any),
      'Address updated successfully.'
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
        console.log(res);
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
