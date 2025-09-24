import type { LoginPayload, LoginResponse, User } from '../types';

/**
 * Sends login credentials to the backend for verification and session creation.
 */
export const loginWithSui = async (payload: LoginPayload): Promise<LoginResponse> => {
    // Using environment variable for backend URL with fallback to localhost
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    const loginEndpoint = `${backendUrl}/auth/login`;

    console.log('Sending login payload to backend:', payload);

    try {
        const response = await fetch(loginEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Authentication failed');
        }

        const data: LoginResponse = await response.json();
        console.log('Received success response from backend:', data);
        return data;
    } catch (err: any) {
        console.error('Backend login error:', err);
        throw new Error(err.message || 'An unknown network error occurred.');
    }
};