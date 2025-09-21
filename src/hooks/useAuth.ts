// import { useState, useEffect , useContext } from 'react';
// import {  User as FirebaseUser } from 'firebase/auth';

// // The custom user data interface for Firestore
// interface UserProfile {
//     email: string;
//     firstName: string;
//     lastName: string;
//     username: string;
//     createdAt: string;
//     referredBy: string | null;
// }
// // user context interface for the app



// // The authentication state interface for the hook
// interface AuthState {
//     user: FirebaseUser | null;
//     loading: boolean;
//     error: string | null;
// }

// export const useAuth = () => {
//     const [authState, setAuthState] = useState<AuthState>({
//         user: null,
//         loading: true,
//         error: null
//     });


//     // Handle auth state changes
//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         console.log('fhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhffffffffffffffffffff')
//         console.log(storedUser)
//         if (storedUser) {
//             setAuthState({
//                 user: JSON.parse(storedUser),
//                 loading: false,
//                 error: null
//             });
//         } else {
//             setAuthState({
//                 user: null,
//                 loading: false,
//                 error: null
//             });
//         }

//     }, []);

//     const signIn = async (email: string, password: string) => {
//         setAuthState(prev => ({ ...prev, loading: true, error: null }));
//         console.log(email, password)

//         try {
//             //https://crypto-invest-backend-1.onrender.com/api/auth/login
//             // await signInWithEmailAndPassword(auth, email, password);http://localhost:8080/  
//             const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ "email": email, "password": password })
//             });
//             console.log( 'dddddddddddddddddddddddddddddd',response)

//             const data = await response.json();
//             console.log('data',data);
//             setAuthState({
//                 user: data.data,
//                 loading: false,
//                 error: null,
//             });
//           localStorage.setItem('user', JSON.stringify(data.data));

//         } catch (error: any) {
//             setAuthState({
//                 user: null,
//                 loading: false,
//                 error: error.message
//             });
//         }
//     };

//     const register = async (email: string, password: string, userProfile: Omit<UserProfile, 'email' | 'createdAt'>) => {
//         setAuthState(prev => ({ ...prev, loading: true, error: null }));
//         const payload = {
//             "email": email,
//             "firstName": userProfile.firstName,
//             "lastName": userProfile.lastName,
//             "username": userProfile.username,
//             "referredBy": userProfile.referredBy,
//             password: password
//         }

//         console.log(
//             payload
//         )

//         try {

//             const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/auth/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(
//                     payload
//                 )
//             });

//             const data = await response.json();
//             console.log(data);
//             setAuthState({
//                 user: data.data,
//                 loading: false,
//                 error: null,
//             });
//             localStorage.setItem('user', JSON.stringify(data.data));
//             console.log(data);

//         } catch (error: any) {
//             setAuthState({
//                 user: null,
//                 loading: false,
//                 error: error.message
//             });
//             // Re-throw the error so the component can handle it
//             console.error(error)
//             throw error;
//         }
//     };

//     const logOut = async () => {
//         setAuthState(prev => ({ ...prev, loading: true, error: null }));
//         try {
//             localStorage.removeItem('user');
//             setAuthState({
//                 user: null,
//                 loading: false,
//                 error: null
//             });
//             location.href = "/auth";
//         } catch (error: any) {
//             setAuthState(prev => ({
//                 ...prev,
//                 loading: false,
//                 error: error.message
//             }));
//         }
//     };

//     return {
//         ...authState,
//         signIn,
//         register,
//         logOut
//     };
// };

// In your custom hook file
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../AuthProder'; // Import from the file you created

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};