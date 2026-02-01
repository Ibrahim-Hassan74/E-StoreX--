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
      background: this.isDark ? '#1f2937' : '#ffffff', 
      color: this.isDark ? '#f3f4f6' : '#1f2937',    
      confirmButtonColor: '#0d9488', 
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
      timer: 1500,
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

  successPopup(message: string, title = 'Success', options: any = {}): Promise<any> {
    return Swal.fire({
      ...this.commonOptions,
      icon: 'success',
      title: title,
      text: message,
      confirmButtonText: 'OK',
      ...options
    });
  }

  confirm(message: string, title = 'Are you sure?', confirmText = 'Yes', cancelText = 'Cancel', icon: any = 'warning'): Promise<boolean> {
    return Swal.fire({
      ...this.commonOptions,
      title: title,
      text: message,
      icon: icon,
      showCancelButton: true,
      confirmButtonColor: icon === 'warning' ? '#f59e0b' : '#d33', // Orange for warning, Red for delete (default logic, can be overridden)
      cancelButtonColor: '#3085d6',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    }).then((result) => {
      return result.isConfirmed;
    });
  }
}
