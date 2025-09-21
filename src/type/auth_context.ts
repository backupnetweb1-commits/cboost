import { createContext, useState, useEffect, ReactNode } from 'react';
import Cookies from 'js-cookie';

// Define the interface for your user data.
// This should match the structure of the data you get from your backend.
interface AuthUser {
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    createdAt: string;
    referredBy: string | null;
}

// Define the shape of the context's value.
interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    error: string | null;
    signIn: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string, userProfile: Omit<AuthUser, 'email' | 'createdAt'>) => Promise<void>;
    logOut: () => void;
}

// Create the context with a default value.
export const AuthContext = createContext<AuthContextType | undefined>(undefined);