import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// (Your interfaces and AuthContext from Step 1 go here)

interface AuthProviderProps {
    children: ReactNode;
}
interface AuthUser {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    createdAt: string;
    referredBy: string | null;
}

// Define the shape of the context's value.
 export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, userProfile: Omit<AuthUser, 'email' | 'createdAt'>) => Promise<void>;
    logOut: () => void;
}

// Create the context with a default value.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [authState, setAuthState] = useState<Omit<AuthContextType, 'signIn' | 'register' | 'logOut'>>({
        user: null,
        loading: true,
        error: null,
    });
    // Handle initial state and cookie parsing
    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            try {
                setAuthState({
                    user: JSON.parse(storedUser),
                    loading: false,
                    error: null,
                });
            } catch (error) {
                console.error("Failed to parse user cookie", error);
                Cookies.remove('user'); // Clear corrupted cookie
                setAuthState({
                    user: null,
                    loading: false,
                    error: null,
                });
            }
        } else {
            setAuthState({
                user: null,
                loading: false,
                error: null,
            });
        }
    }, []);
    
    // The sign-in logic, modified to use cookies
    const signIn = async (email: string, password: string) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }
            const data = await response.json();
            // Set the user data in a cookie instead of localStorage
            Cookies.set('user', JSON.stringify(data.data), { expires: 0.02 }); // Expires in 7 days
            setAuthState({ user: data.data, loading: false, error: null });
        } catch (error: any) {
            setAuthState({ user: null, loading: false, error: error.message });
        }
    };

    // The register logic, modified to use cookies
    const register = async (email: string, password: string, userProfile: Omit<AuthUser, 'email' | 'createdAt'>) => {
        setAuthState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const payload = { ...userProfile, email, password };
            console.log(payload)
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }
            const data = await response.json();
            Cookies.set('user', JSON.stringify(data.data), { expires: 7 });
            setAuthState({ user: data.data, loading: false, error: null });
        } catch (error: any) {
            setAuthState({ user: null, loading: false, error: error.message });
            throw error; // Re-throw for component-level error handling
        }
    };

    // The log-out logic, modified to remove the cookie
    const logOut = () => {
        Cookies.remove('user'); // Remove the user cookie
        setAuthState({ user: null, loading: false, error: null });
        window.location.href = "/auth"; // Optional: redirect to login page
    };

    const value = {
        ...authState,
        signIn,
        register,
        logOut,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};