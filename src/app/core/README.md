# Authentication System

This directory contains a comprehensive authentication system for the Angular application with JWT token management, automatic refresh, and user state management.

## Architecture

The authentication system is built with a modular approach:

```
core/
├── interfaces/
│   └── auth.interface.ts          # TypeScript interfaces for auth data
├── services/
│   ├── auth.service.ts            # Main authentication business logic
│   ├── token.service.ts           # JWT token management
│   ├── user-storage.service.ts    # User data and state management
│   └── api/
│       └── auth-api.service.ts    # API communication layer
├── guards/
│   ├── auth.guard.ts              # Route protection for authenticated users
│   └── guest.guard.ts             # Route protection for guest users
├── interceptors/
│   └── auth.interceptor.ts        # HTTP interceptor for automatic token handling
└── components/
    └── auth-example/
        └── auth-example.component.ts  # Example usage component
```

## Features

### ✅ Core Authentication
- **Login** - User authentication with email/password
- **Registration** - New user account creation
- **Logout** - Secure user logout with token cleanup
- **Token Refresh** - Automatic access token renewal

### ✅ Token Management
- **JWT Support** - JSON Web Token handling
- **Bearer Token** - Automatic Authorization header injection
- **Token Validation** - Expiry checking with buffer time
- **Secure Storage** - LocalStorage with proper cleanup

### ✅ User State Management
- **Reactive State** - Observable-based state management
- **User Data Storage** - Persistent user information
- **Loading States** - UI loading indicators
- **Error Handling** - Comprehensive error management

### ✅ Security Features
- **Route Guards** - Protected and guest-only routes
- **HTTP Interceptor** - Automatic token injection and refresh
- **Token Refresh** - Seamless token renewal before expiry
- **Force Logout** - Clean logout on token refresh failure

## Usage

### 1. Basic Authentication

```typescript
import { AuthService } from './core/services/auth.service';

constructor(private authService: AuthService) {}

// Login
login(email: string, password: string) {
  this.authService.login({ email, password }).subscribe({
    next: (response) => console.log('Login successful', response),
    error: (error) => console.error('Login failed', error)
  });
}

// Register
register(userData: RegisterRequest) {
  this.authService.register(userData).subscribe({
    next: (response) => console.log('Registration successful', response),
    error: (error) => console.error('Registration failed', error)
  });
}

// Logout
logout() {
  this.authService.logout().subscribe({
    next: () => console.log('Logout successful'),
    error: () => this.authService.forceLogout()
  });
}
```

### 2. State Management

```typescript
// Subscribe to auth state changes
this.authService.getAuthState$().subscribe(authState => {
  if (authState.isAuthenticated) {
    console.log('User is logged in:', authState.user);
  } else {
    console.log('User is not logged in');
  }
});

// Check authentication status
if (this.authService.isAuthenticated()) {
  const user = this.authService.getCurrentUser();
  console.log('Current user:', user);
}
```

### 3. Route Protection

```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]  // Requires authentication
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]  // Only for non-authenticated users
  }
];
```

### 4. HTTP Interceptor Setup

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // ... other providers
  ]
};
```

## API Endpoints

The system expects the following API endpoints:

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Token refresh

### User Management
- `GET /auth/profile` - Get user profile
- `PUT /auth/profile` - Update user profile
- `POST /auth/change-password` - Change password
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Verify email address
- `POST /auth/resend-verification` - Resend email verification

## Configuration

### Environment Variables

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

### Token Configuration

The system automatically handles:
- **Access Token Expiry** - 5-minute buffer before refresh
- **Token Storage** - Secure localStorage management
- **Auto Refresh** - Seamless token renewal

## Security Considerations

1. **Token Storage** - Tokens are stored in localStorage (consider httpOnly cookies for production)
2. **Token Validation** - Automatic expiry checking with buffer time
3. **HTTPS** - Ensure all API communication uses HTTPS in production
4. **CORS** - Configure proper CORS settings on your backend
5. **Rate Limiting** - Implement rate limiting on authentication endpoints

## Error Handling

The system provides comprehensive error handling:

```typescript
// Error types
interface AuthError {
  message: string;
  code: string;
  status: number;
}

// Error handling in components
this.authService.getAuthState$().subscribe(authState => {
  if (authState.error) {
    console.error('Auth error:', authState.error);
    // Handle error in UI
  }
});
```

## Testing

The authentication system is designed to be easily testable:

```typescript
// Mock services for testing
const mockAuthService = {
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
  getCurrentUser: jasmine.createSpy('getCurrentUser').and.returnValue(mockUser)
};
```

## Migration Guide

If migrating from an existing auth system:

1. **Update API Calls** - Replace existing auth calls with new service methods
2. **Update State Management** - Replace existing state management with new reactive approach
3. **Update Guards** - Replace existing guards with new AuthGuard and GuestGuard
4. **Update Interceptors** - Add the new AuthInterceptor to handle tokens automatically

## Troubleshooting

### Common Issues

1. **Token Not Refreshing** - Check if refresh token is valid and API endpoint is correct
2. **State Not Updating** - Ensure you're subscribing to `getAuthState$()` observable
3. **Guards Not Working** - Verify guards are properly configured in routes
4. **Interceptor Not Working** - Check if interceptor is properly registered in app config

### Debug Mode

Enable debug logging by setting:

```typescript
// In your component or service
console.log('Auth state:', this.authService.getAuthState());
console.log('Token valid:', this.authService.isAuthenticated());
```

