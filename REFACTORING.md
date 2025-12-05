# Authentication Pages Refactoring

## Overview
Refactored login and signup pages to improve code organization, reusability, and maintainability using custom hooks, services, and utility functions.

## New Structure

### **Custom Hooks** (`src/hooks/`)

#### `useLogin.ts`
- Manages login state and logic
- Handles authentication flow
- Integrates with authService
- Provides `login()` method and `isLoading` state

#### `useKeyboardNavigation.ts`
- Reusable keyboard navigation logic
- Supports Tab, Arrow keys, Enter, Space, and Escape
- Configurable key handlers (onEnter, onSpace, onEscape)
- Can be enabled/disabled dynamically

#### `useRoleSelection.ts`
- Manages role selection state (learner/mentor)
- Controls confirmation modal visibility
- Handles role confirmation and cancellation

#### `useModalNavigation.ts`
- Dedicated keyboard navigation for modals
- Auto-focuses first element on modal open
- Returns focus to original element on close
- Handles Tab, Arrow, Enter, and Escape keys

### **Utilities** (`src/utils/`)

#### `authHelpers.ts`
- `handleLoginError()` - Centralized error handling for login
- `redirectByRole()` - Role-based navigation
- `handleSignupError()` - Signup form error handling

#### `navigationHelpers.ts`
- `navigateToHome()` - Navigate to homepage with optional anchor
- `navigateToSignup()` - Navigate to signup page
- `navigateToLogin()` - Navigate to login page
- `navigateToLearnerInfo()` - Navigate to learner info page
- `navigateToMentorInfo()` - Navigate to mentor info page
- `selectRoleAndNavigate()` - Store role and navigate to info page

### **Services** (`src/services/`)

#### `authService.ts` (updated)
Already contains:
- `login()` - API call for login
- `logout()` - API call for logout
- `checkAuth()` - Check authentication status

## Benefits

### ✅ **Improved Readability**
- Pages are now ~180 lines instead of 345+ lines
- Clear separation of concerns
- Self-documenting code with descriptive hook and utility names

### ✅ **Reusability**
- Keyboard navigation can be used in any component
- Authentication logic can be shared across pages
- Navigation utilities accessible globally
- Error handling centralized

### ✅ **Maintainability**
- Single source of truth for authentication logic
- Easy to update error messages in one place
- Simplified testing (hooks and utilities are testable)
- Reduced code duplication

### ✅ **Type Safety**
- Full TypeScript support
- Type-safe hook parameters and return values
- Proper typing for router instances

## Usage Examples

### Login Page
```tsx
const { login, isLoading } = useLogin();
const { handleKeyDown } = useKeyboardNavigation({ ... });

// Simply call login with credentials
login(iniCred, password);
```

### Signup Page
```tsx
const { initiateSignUp, confirmSelection } = useRoleSelection();
useModalNavigation({ isOpen: showModal, ... });

// Handle role selection
initiateSignUp('learner');
```

### Navigation
```tsx
import { navigateToHome, selectRoleAndNavigate } from '@/utils/navigationHelpers';

navigateToHome(router, 'get-started');
selectRoleAndNavigate('learner', router);
```

### Error Handling
```tsx
import { handleLoginError, handleSignupError } from '@/utils/authHelpers';

try {
  // API call
} catch (error) {
  handleLoginError(error); // Shows appropriate toast message
}
```

## Migration Guide

Other pages can now use these reusable components:

1. **For authentication**: Use `useLogin()` hook
2. **For keyboard navigation**: Use `useKeyboardNavigation()` hook
3. **For modals**: Use `useModalNavigation()` hook
4. **For navigation**: Import functions from `navigationHelpers.ts`
5. **For error handling**: Import functions from `authHelpers.ts`

## File Organization

```
src/
├── hooks/
│   ├── useLogin.ts                    # Login logic
│   ├── useKeyboardNavigation.ts       # Keyboard navigation
│   ├── useRoleSelection.ts            # Role selection logic
│   └── useModalNavigation.ts          # Modal keyboard navigation
├── utils/
│   ├── authHelpers.ts                 # Auth error handling & redirects
│   └── navigationHelpers.ts           # Navigation utilities
└── services/
    └── authService.ts                 # API calls for authentication
```
