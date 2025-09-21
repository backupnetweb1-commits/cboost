import { useState } from 'react';

interface ContactPayload {
     fullName: String;
    email: String;
    whatsappNumber: String;
    subject: String;
    message: String;
}

interface UseContactResult {
    sendContact: (payload: ContactPayload) => Promise<void>;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export function useContact(): UseContactResult {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const sendContact = async (payload: ContactPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await fetch('https://crypto-invest-backend-1.onrender.com/api/v1/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                throw new Error('Failed to send contact message');
            }
            setSuccess(true);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    return { sendContact, loading, error, success };
}