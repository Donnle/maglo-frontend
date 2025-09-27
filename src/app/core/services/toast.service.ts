import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Basic toast notification service for displaying user-friendly messages
 * Provides only basic success, error, warning, and info notifications
 * Auth-specific messages are handled in the AuthService
 */

export interface ToastOptions {
  timeOut?: number;
  closeButton?: boolean;
  progressBar?: boolean;
  positionClass?: string;
  enableHtml?: boolean;
  tapToDismiss?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private readonly defaultOptions: ToastOptions = {
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right',
    enableHtml: false,
    tapToDismiss: true
  };

  constructor(private toastr: ToastrService) {}

  /**
   * Show success message
   * @param message - Success message
   * @param title - Optional title
   * @param options - Toast options
   */
  success(message: string, title?: string, options?: ToastOptions): void {
    this.toastr.success(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show error message
   * @param message - Error message
   * @param title - Optional title
   * @param options - Toast options
   */
  error(message: string, title?: string, options?: ToastOptions): void {
    this.toastr.error(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show warning message
   * @param message - Warning message
   * @param title - Optional title
   * @param options - Toast options
   */
  warning(message: string, title?: string, options?: ToastOptions): void {
    this.toastr.warning(message, title, { ...this.defaultOptions, ...options });
  }

  /**
   * Show info message
   * @param message - Info message
   * @param title - Optional title
   * @param options - Toast options
   */
  info(message: string, title?: string, options?: ToastOptions): void {
    this.toastr.info(message, title, { ...this.defaultOptions, ...options });
  }


  /**
   * Clear all toasts
   */
  clear(): void {
    this.toastr.clear();
  }

  /**
   * Clear specific toast
   * @param toastId - Toast ID
   */
  clearToast(toastId: number): void {
    this.toastr.clear(toastId);
  }
}
