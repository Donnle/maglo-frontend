import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

export const errorHandlerInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<any> => {
  const toastr = inject(ToastrService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      handleError(error, toastr);
      return throwError(() => error);
    })
  );
};

function handleError(error: HttpErrorResponse, toastr: ToastrService): void {
  let errorMessage = 'An unexpected error occurred';
  let errorTitle = 'Error';

  if (error.error instanceof ErrorEvent) {
    // Client-side error
    errorMessage = `Client Error: ${error.error.message}`;
    errorTitle = 'Client Error';
  } else {
    // Server-side error
    const status = error.status;
    const serverError = error.error;

    switch (status) {
      case 400:
        errorTitle = 'Bad Request';
        errorMessage = getErrorMessage(serverError) || 'Invalid request data';
        break;
      case 401:
        errorTitle = 'Unauthorized';
        errorMessage = getErrorMessage(serverError) || 'Authentication required';
        break;
      case 403:
        errorTitle = 'Forbidden';
        errorMessage = getErrorMessage(serverError) || 'Access denied';
        break;
      case 404:
        errorTitle = 'Not Found';
        errorMessage = getErrorMessage(serverError) || 'Resource not found';
        break;
      case 409:
        errorTitle = 'Conflict';
        errorMessage = getErrorMessage(serverError) || 'Resource conflict';
        break;
      case 422:
        errorTitle = 'Validation Error';
        errorMessage = getErrorMessage(serverError) || 'Validation failed';
        break;
      case 429:
        errorTitle = 'Too Many Requests';
        errorMessage = getErrorMessage(serverError) || 'Rate limit exceeded';
        break;
      case 500:
        errorTitle = 'Server Error';
        errorMessage = getErrorMessage(serverError) || 'Internal server error';
        break;
      case 502:
        errorTitle = 'Bad Gateway';
        errorMessage = getErrorMessage(serverError) || 'Bad gateway';
        break;
      case 503:
        errorTitle = 'Service Unavailable';
        errorMessage = getErrorMessage(serverError) || 'Service temporarily unavailable';
        break;
      case 504:
        errorTitle = 'Gateway Timeout';
        errorMessage = getErrorMessage(serverError) || 'Gateway timeout';
        break;
      default:
        errorTitle = `Error ${status}`;
        errorMessage = getErrorMessage(serverError) || `HTTP ${status} error`;
    }
  }

  // Show error toast
  toastr.error(errorMessage, errorTitle, {
    timeOut: 5000,
    closeButton: true,
    progressBar: true,
    positionClass: 'toast-top-right'
  });

  // Log error for debugging
  console.error('HTTP Error:', {
    status: error.status,
    message: errorMessage,
    url: error.url,
    error: error.error
  });
}

function getErrorMessage(serverError: any): string | null {
  if (!serverError) return null;

  // Try different common error message fields
  if (typeof serverError === 'string') {
    return serverError;
  }

  if (serverError.message) {
    return serverError.message;
  }

  if (serverError.error) {
    return serverError.error;
  }

  if (serverError.detail) {
    return serverError.detail;
  }

  if (serverError.errors && Array.isArray(serverError.errors)) {
    return serverError.errors.join(', ');
  }

  if (serverError.validation_errors) {
    const errors = Object.values(serverError.validation_errors).flat();
    return Array.isArray(errors) ? errors.join(', ') : String(errors);
  }

  return null;
}
