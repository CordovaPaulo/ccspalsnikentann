import api from './axios';

interface AuthResponse {
  authenticated: boolean;
  user?: {
    id: string;
    username: string;
    email: string;
    role: string;
    accountStatus?: string;
  };
  message?: string;
  code: number;
}

/**
 * Check if user is authenticated by calling the internal API endpoint
 * which proxies to the external API
 */
export async function checkAuth(): Promise<AuthResponse> {
  try {
    const response = await api.get('/api/auth/check', {
      withCredentials: true,
    });
    
    return response.data;
  } catch (error: any) {
    return {
      authenticated: false,
      message: error.response?.data?.message || 'Authentication check failed',
      code: error.response?.status || 500
    };
  }
}

/**
 * Get authentication token for API calls
 * Uses localStorage token as fallback
 */
export function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Check if user has a specific role
 */
export async function hasRole(requiredRole: string): Promise<boolean> {
  const auth = await checkAuth();
  return auth.authenticated && auth.user?.role === requiredRole;
}

/**
 * Get current user information
 */
export async function getCurrentUser() {
  const auth = await checkAuth();
  return auth.authenticated ? auth.user : null;
}
