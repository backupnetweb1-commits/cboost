// src/components/Authentication.jsx

import React,{ useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/useAuth';
import { useParams,useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const Authentication = () => {
    const { t } = useTranslation();
    const { ref } = useParams()
    const navigate = useNavigate();
    // State to toggle between login and sign up
    const [isLogin, setIsLogin] = useState(false);

    // Form field states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
   const [referredBy, setReferredBy] = useState(ref || null); // string

    
    // Destructure state and functions from the custom useAuth hook
    // The hook now handles the loading and error states for us.
    const { loading, error,user,signIn, register } = useAuth();

    console.log('Muserrrrrrrrrrrrrrrr',user)
    //localStorage.clear();
    // The single function to handle both login and sign up form submissions
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (isLogin) {
                // Use the signIn function from the useAuth hook
                await signIn(email, password);
                console.log("User logged in successfully!");
            } else {
                // Use the register function from the useAuth hook
                // Pass the additional user data as an object
                const userProfile = {
                    firstName,
                    lastName,
                    username,
                    referredBy,
                };
                await register(email, password, userProfile);
                console.log("New user created and data saved to Firestore!");
            }
        } catch (err) {
            // The useAuth hook already sets the error state, so no need for manual setError
            // You can, however, log it here for debugging
            console.error("Authentication Error:", err.message);
        }
    };

   React.useEffect(() => {
        // Only redirect if the user state is not null and we are not in a loading state
        if (user && !loading) {
            navigate("/", { replace: true });
        }
    }, [user, loading, navigate]);

    console.log('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM',ref)

    return (
        <div className="flex items-center justify-center min-h-screen bg-background dark:bg-gray-900">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">
                        {isLogin ? t('welcome_back') : t('start_trading_crypto')}
                    </CardTitle>
                    <CardDescription>
                        {isLogin ? t('login_description') : t('signup_description')}
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleFormSubmit}>
                    <CardContent className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="email">{t('email')}</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">{t('password')}</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {/* Conditional rendering for new sign-up fields */}
                        {!isLogin && (
                            <>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="firstName">{t('first_name')}</Label>
                                        <Input
                                            id="firstName"
                                            type="text"
                                            placeholder="John"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="lastName">{t('last_name')}</Label>
                                        <Input
                                            id="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="username">{t('username')}</Label>
                                    <Input
                                        id="username"
                                        type="text"
                                        placeholder="johndoe123"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                               { !ref && ( <div className="grid gap-2">
                                    <Label htmlFor="referral">Referred By (Optional)</Label>
                                   <Input
                                    id="referral"
                                    type="text"
                                    placeholder="Enter your referral link here"
                                    value={referredBy}
                                    onChange={(e) => setReferredBy(e.target.value)}
                                />

                                </div>)}
                            </>
                        )}
                        {/* Display error message from the useAuth hook */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">{error}</p>
                        )}
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? t('loading') : (isLogin ? t('login') : t('create_account'))}
                        </Button>
                        <Separator className="my-4" />
                        <Button
                            variant="link"
                            className="text-sm"
                            onClick={() => setIsLogin(!isLogin)}
                            type="button"
                        >
                            {isLogin ? t('new_to_platform') : t('already_have_account')}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default Authentication;
