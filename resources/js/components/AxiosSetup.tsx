// resources/js/Components/AxiosSetup.tsx
import axios from 'axios';
import { useEffect } from 'react';

interface Props {
    api_token?: string;
}

const AxiosSetup: React.FC<Props> = ({ api_token }) => {
    useEffect(() => {
        const token = api_token || getTokenFromCookie();

        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            console.warn('Auth token not found');
        }
    }, [api_token]);

    return null;
};

function getTokenFromCookie(): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split('; auth-token=');
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}

export default AxiosSetup;
