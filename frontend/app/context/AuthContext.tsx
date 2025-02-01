"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AuthData {
    user: boolean | null; // Change `any` to a specific type if you have a user model
}

interface AuthContextType {
    authData: AuthData;
    setAuthData: React.Dispatch<React.SetStateAction<AuthData>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authData, setAuthData] = useState<AuthData>({ user: null });

    useEffect(() => {
        const check = async () => {
            const storedUser = sessionStorage.getItem('care-label-user');
            if (storedUser) {
                setAuthData({ user: true });
            }
            else{
                setAuthData({ user: false });
            }
        };
        check();
    }, []);

    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    );
}

// Reads Auth Data (globally)
export function useAuthData() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthData must be used within an AuthProvider');
    }
    return context.authData;
}

// Manages Auth Data (globally)
export function useAuthDispatch() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthDispatch must be used within an AuthProvider');
    }
    return context.setAuthData;
}
