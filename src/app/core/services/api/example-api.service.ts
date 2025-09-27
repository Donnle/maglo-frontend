import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApiService } from '../../../shared/services/base-api.service';

// Example interfaces for demonstration
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export interface UserListResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
}

/**
 * Example API service demonstrating how to extend BaseApiService
 * This service shows how to use all four HTTP methods (GET, POST, PUT, DELETE)
 */
@Injectable({
  providedIn: 'root'
})
export class ExampleApiService extends BaseApiService {

  constructor(http: HttpClient) {
    super(http);
  }

  /**
   * GET - Fetch all users with pagination
   * @param page - Page number
   * @param limit - Number of items per page
   * @returns Observable<UserListResponse>
   */
  getUsers(page: number = 1, limit: number = 10): Observable<UserListResponse> {
    return this.get<UserListResponse>('/users', { page, limit });
  }

  /**
   * GET - Fetch a specific user by ID
   * @param id - User ID
   * @returns Observable<User>
   */
  getUserById(id: string): Observable<User> {
    return this.get<User>(`/users/${id}`);
  }

  /**
   * POST - Create a new user
   * @param userData - User data to create
   * @returns Observable<User>
   */
  createUser(userData: CreateUserRequest): Observable<User> {
    return this.post<User>('/users', userData);
  }

  /**
   * PUT - Update an existing user
   * @param id - User ID to update
   * @param userData - Updated user data
   * @returns Observable<User>
   */
  updateUser(id: string, userData: UpdateUserRequest): Observable<User> {
    return this.put<User>(`/users/${id}`, userData);
  }

  /**
   * DELETE - Delete a user
   * @param id - User ID to delete
   * @returns Observable<any>
   */
  deleteUser(id: string): Observable<any> {
    return this.delete(`/users/${id}`);
  }

  /**
   * GET - Search users with custom query parameters
   * @param searchTerm - Search term
   * @param filters - Additional filters
   * @returns Observable<UserListResponse>
   */
  searchUsers(searchTerm: string, filters?: any): Observable<UserListResponse> {
    const params = {
      search: searchTerm,
      ...filters
    };
    return this.get<UserListResponse>('/users/search', params);
  }

  /**
   * POST - Example of a custom endpoint with additional headers
   * @param data - Data to send
   * @returns Observable<any>
   */
  customEndpoint(data: any): Observable<any> {
    const customOptions = {
      headers: {
        'Custom-Header': 'custom-value'
      }
    };
    return this.post('/custom-endpoint', data, customOptions);
  }
}
