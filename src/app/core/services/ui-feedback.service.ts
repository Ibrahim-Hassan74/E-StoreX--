import { Injectable, inject, effect } from '@angular/core';
import { NavbarService } from '../layout/nav-bar/navbar.service';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UiFeedbackService {
  private navbarService = inject(NavbarService);
  private isDark = false;

  constructor() {
    effect(() => {
      this.isDark = this.navbarService.mode();
    });
  }

  private get commonOptions() {
    return {
      background: this.isDark ? '#1f2937' : '#ffffff', // gray-800 : white
      color: this.isDark ? '#f3f4f6' : '#1f2937',     // gray-100 : gray-800
      confirmButtonColor: '#0d9488', // Teal-600 (primary color)
    };
  }

  success(message: string, title = 'Success', options: any = {}): Promise<any> {
    return Swal.fire({
      ...this.commonOptions,
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: title,
      text: message,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      ...options
    });
  }

  error(message: string, title = 'Error', options: any = {}): Promise<any> {
    return Swal.fire({
      ...this.commonOptions,
      icon: 'error',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      ...options
    });
  }

  info(message: string, title = 'Info', options: any = {}): Promise<any> {
    return Swal.fire({
      ...this.commonOptions,
      icon: 'info',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      ...options
    });
  }

  warning(message: string, title = 'Warning', options: any = {}): Promise<any> {
    return Swal.fire({
      ...this.commonOptions,
      icon: 'warning',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      ...options
    });
  }
}
