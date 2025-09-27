import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {
  protected baseUrl: string;
  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(protected http: HttpClient) {
    this.baseUrl = environment.apiUrl || '';
  }

  /**
   * GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @param options - Additional HTTP options
   * @returns Observable<T>
   */
  protected get<T>(endpoint: string, params?: any, options?: any): Observable<T> {
    const httpParams = this.buildHttpParams(params);
    const httpOptions = { 
      ...this.httpOptions, 
      ...options, 
      params: httpParams
    };
    
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, httpOptions) as Observable<T>;
  }

  /**
   * POST request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param options - Additional HTTP options
   * @returns Observable<T>
   */
  protected post<T>(endpoint: string, data?: any, options?: any): Observable<T> {
    const httpOptions = { 
      ...this.httpOptions, 
      ...options
    };
    
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, data, httpOptions) as Observable<T>;
  }

  /**
   * PUT request
   * @param endpoint - API endpoint
   * @param data - Request body data
   * @param options - Additional HTTP options
   * @returns Observable<T>
   */
  protected put<T>(endpoint: string, data?: any, options?: any): Observable<T> {
    const httpOptions = { 
      ...this.httpOptions, 
      ...options
    };
    
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, data, httpOptions) as Observable<T>;
  }

  /**
   * DELETE request
   * @param endpoint - API endpoint
   * @param options - Additional HTTP options
   * @returns Observable<T>
   */
  protected delete<T>(endpoint: string, options?: any): Observable<T> {
    const httpOptions = { 
      ...this.httpOptions, 
      ...options
    };
    
    return this.http.delete<T>(`${this.baseUrl}${endpoint}`, httpOptions) as Observable<T>;
  }

  /**
   * Build HttpParams from object
   * @param params - Object with parameters
   * @returns HttpParams
   */
  private buildHttpParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }
    
    return httpParams;
  }

  /**
   * Handle HTTP errors
   * @param error - HttpErrorResponse
   * @returns Observable<never>
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error('API Error:', errorMessage);
    return throwError(() => error);
  }
}
