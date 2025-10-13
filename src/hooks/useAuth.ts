import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../AuthProder'; // Import from the file you created

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};