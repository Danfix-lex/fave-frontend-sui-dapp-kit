
import type { LoginPayload, LoginResponse, User } from '../types';

/**
 * Sends login credentials to the backend for verification and session creation.
 * 
 * NOTE: This is a MOCKED implementation for demonstration purposes.
 * In a real application, you would replace this with a `fetch` call to your backend API.
 * 
 * Example `fetch` implementation:
 * 
 * const response = await fetch('/auth/login', { // Or your full backend URL
 *   method: 'POST',
 *   headers: {
 *     'Content-Type': 'application/json',
 *   },
 *   body: JSON.stringify(payload),
 * });
 * 
 * if (!response.ok) {
 *   const errorData = await response.json();
 *   throw new Error(errorData.message || 'Authentication failed');
 * }
 * 
 * const data: LoginResponse = await response.json();
 * return data;
 * 
 */
export const loginWithSui = (payload: LoginPayload): Promise<LoginResponse> => {
  return new Promise((resolve, reject) => {
    console.log('Sending login payload to backend:', payload);

    // Simulate network delay
    setTimeout(() => {
      // Simulate a successful login
      if (payload.idToken && payload.suiAddress) {
        const mockUser: User = {
          suiAddress: payload.suiAddress,
          role: payload.role,
        };
        
        const mockResponse: LoginResponse = {
          sessionToken: `mock-session-token-${Date.now()}`,
          user: mockUser,
        };
        
        console.log('Received mock success response from backend:', mockResponse);
        resolve(mockResponse);
      } else {
        // Simulate an error
        console.error('Mock backend error: Invalid payload.');
        reject(new Error('Authentication failed. Invalid idToken or suiAddress.'));
      }
    }, 1500); // 1.5 second delay
  });
};
