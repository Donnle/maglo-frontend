# Updated Authentication System with NgXS & Toastr

This is the enhanced authentication system with NgXS state management, ngx-toastr notifications, and improved error handling.

## 🚀 New Features

### ✅ NgXS State Management
- **Centralized State** - All auth state managed in one place
- **Reactive Updates** - Automatic UI updates on state changes
- **DevTools Support** - Redux DevTools integration for debugging
- **Time Travel** - State history and debugging capabilities

### ✅ Toast Notifications
- **User-Friendly Errors** - Beautiful toast notifications instead of console errors
- **Success Messages** - Positive feedback for user actions
- **Customizable** - Configurable appearance and behavior
- **Non-Intrusive** - Doesn't block user interaction

### ✅ Enhanced Error Handling
- **Global Error Interceptor** - Catches all HTTP errors automatically
- **Smart Error Messages** - Context-aware error messages
- **Error Categorization** - Different handling for different error types
- **User Experience** - Clear, actionable error messages

### ✅ Improved Loading States
- **Finalize Pipe** - Guaranteed loading state cleanup
- **No Memory Leaks** - Proper subscription management
- **Consistent UX** - Loading states always reset properly

## 📁 Updated Architecture

```
core/
├── state/
│   └── auth.state.ts              # NgXS state management
├── services/
│   ├── auth.service.ts            # Main auth service (updated)
│   ├── auth-ngxs.service.ts       # NgXS service layer
│   ├── token.service.ts           # JWT token management
│   └── toast.service.ts           # Toast notification service
├── interceptors/
│   ├── auth.interceptor.ts        # Token handling
│   └── error-handler.interceptor.ts  # Global error handling
├── config/
│   └── app.config.ts              # App configuration
└── examples/
    └── token-usage.example.ts     # Token method examples
```

## 🔧 Token Methods Explained

### `getUserFromToken()` - Quick User Info
```typescript
// Get user info from current access token (no API call)
const userInfo = this.tokenService.getUserFromToken();
console.log(userInfo); // { sub: 'user123', email: 'user@example.com', name: 'John Doe' }
```

**Use Cases:**
- **Performance** - Avoid API calls for basic user data
- **Offline Mode** - Get user info when offline
- **Quick Access** - Instant user data without waiting for API

### `decodeToken(token)` - Decode Any JWT
```typescript
// Decode any JWT token to see its payload
const payload = this.tokenService.decodeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
console.log(payload); // Decoded token payload
```

**Use Cases:**
- **Debugging** - Inspect token contents
- **Validation** - Check token structure
- **External Tokens** - Process tokens from other sources

## 🎯 Real-World Examples

### 1. Quick User Info Display
```typescript
@Component({...})
export class UserProfileComponent {
  userInfo$ = this.authService.getAuthState$().pipe(
    map(state => state.user)
  );

  // Or get instantly from token
  getQuickUserInfo() {
    const user = this.tokenService.getUserFromToken();
    return user ? { name: user.name, email: user.email } : null;
  }
}
```

### 2. Role-Based UI
```typescript
// Check user role without API call
isAdmin(): boolean {
  const user = this.tokenService.getUserFromToken();
  return user?.role === 'admin';
}

// In template
<div *ngIf="isAdmin()">Admin Panel</div>
```

### 3. Token Expiry Warning
```typescript
// Check if token expires soon
checkTokenExpiry() {
  const user = this.tokenService.getUserFromToken();
  if (user) {
    const timeLeft = user.exp - Math.floor(Date.now() / 1000);
    if (timeLeft < 300) { // 5 minutes
      this.toastService.warning('Your session will expire soon');
    }
  }
}
```

## 🔄 State Management with NgXS

### Selectors
```typescript
// In your component
export class MyComponent {
  // Select specific state
  isAuthenticated$ = this.store.select(AuthState.isAuthenticated);
  currentUser$ = this.store.select(AuthState.user);
  isLoading$ = this.store.select(AuthState.isLoading);

  // Select entire auth state
  authState$ = this.store.select(AuthState.authState);
}
```

### Actions
```typescript
// Dispatch actions
this.store.dispatch(new SetUser(user));
this.store.dispatch(new SetLoading(true));
this.store.dispatch(new LoginSuccess(user, token, refreshToken, expiresIn));
```

## 🍞 Toast Notifications

### Basic Usage
```typescript
constructor(private toastService: ToastService) {}

// Success
this.toastService.success('Operation completed successfully');

// Error
this.toastService.error('Something went wrong', 'Error');

// Warning
this.toastService.warning('Please check your input');

// Info
this.toastService.info('New feature available');
```

### Auth-Specific Toasts
```typescript
// Auth service handles specific messages with custom options
// Login success
this.toastService.success('Welcome back!', 'Login Successful', {
  timeOut: 3000,
  positionClass: 'toast-top-center'
});

// Auth error
this.toastService.error('Invalid credentials', 'Login Error', {
  timeOut: 6000,
  positionClass: 'toast-top-center'
});
```

## 🛡️ Error Handling

### Global Error Interceptor
The error interceptor automatically catches all HTTP errors and shows appropriate toast messages:

```typescript
// Automatically handled:
// 401 -> "Authentication required"
// 403 -> "Access denied" 
// 404 -> "Resource not found"
// 500 -> "Internal server error"
// etc.
```

### Custom Error Handling
```typescript
// In your service
this.authService.login(credentials).subscribe({
  next: (response) => {
    // Success handled by interceptor
  },
  error: (error) => {
    // Error already shown by interceptor
    // Additional custom handling if needed
  }
});
```

## ⚙️ Configuration

### App Config Setup
```typescript
// app.config.ts
import { appConfig } from './core/config/app.config';

bootstrapApplication(AppComponent, appConfig);
```

### Environment Setup
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

## 🚀 Migration Guide

### From Old System
1. **Use AuthService** for all authentication operations
2. **Update State Subscriptions** to use NgXS selectors
3. **Remove Manual Error Handling** - now handled by interceptors
4. **Update Loading States** - now handled by finalize pipe

### Before (Old System)
```typescript
// Old way
this.userStorageService.setLoading(true);
this.userStorageService.setError('Error message');
this.userStorageService.getAuthState$().subscribe(state => {
  // Handle state
});
```

### After (New System)
```typescript
// New way
this.authService.login(credentials).subscribe({
  next: (response) => {
    // Success handled automatically
  },
  error: (error) => {
    // Error shown as toast automatically
  }
});

// State subscription
this.authService.getAuthState$().subscribe(state => {
  // State updates automatically
});
```

## 🧪 Testing

### Mock Services
```typescript
// Test setup
const mockAuthService = {
  getAuthState$: () => of(mockAuthState),
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  isAuthenticated: jasmine.createSpy('isAuthenticated')
};

const mockToastService = {
  success: jasmine.createSpy('success'),
  error: jasmine.createSpy('error')
};
```

## 🔍 Debugging

### NgXS DevTools
1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. See all state changes and actions
4. Time travel debugging available

### Token Debugging
```typescript
// Debug token contents
const token = this.tokenService.getAccessToken();
const payload = this.tokenService.decodeToken(token);
console.log('Token payload:', payload);
```

## 📊 Performance Benefits

1. **Reduced API Calls** - Use token data instead of API calls
2. **Faster UI Updates** - NgXS provides optimized change detection
3. **Better Memory Management** - Proper subscription cleanup
4. **Improved UX** - Toast notifications instead of console errors

## 🎨 Customization

### Toast Styling
```typescript
// Custom toast options
this.toastService.success('Message', 'Title', {
  timeOut: 3000,
  positionClass: 'toast-top-center',
  closeButton: true
});
```

### Error Messages
```typescript
// Custom error handling
this.toastService.error('Custom error message', 'Custom Title', {
  timeOut: 10000,
  enableHtml: true
});
```

This updated system provides a much better developer experience and user experience with modern state management, beautiful notifications, and robust error handling!
