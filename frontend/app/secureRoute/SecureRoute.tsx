'use client'
import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { verify } from '../api-service/auth';
import { Box, CssBaseline } from '@mui/material';
import { useAuthDispatch } from '../context/AuthContext';


interface SecureRouteProps {
    children: ReactNode;
}

const SecureRoute: React.FC<SecureRouteProps> = ({ children }) => {
    const [verified, setVerified] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const setAuthData = useAuthDispatch();

    useEffect(() => {
        const getVerification = async () => {
            const response = await verify();
            if (response.status === 200) {
                setVerified(true);
            } else {
                sessionStorage.removeItem('care-label-user');
                setAuthData({ user: false });
                router.push('/sign-in'); // Move redirection inside useEffect
            }
            setLoading(false);
        };

        getVerification();
    }, [router]);

    if (loading) {
        return (
            <Box
                sx={{
                    minHeight:'100vh',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <CssBaseline/>
                Loading...
            </Box>
        );
    }

    if (!verified) {
        return (
            <Box
                sx={{
                    minHeight:'100vh',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
            >
                <CssBaseline/>
                Redirecting...
            </Box>
        ); // Prevent rendering until redirection happens
    }

    return <>{children}</>;
};

export default SecureRoute;
