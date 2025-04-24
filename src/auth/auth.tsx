import React, { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { auth } from '../firebase/firebaseConfig'; // Adjust the import path as necessary
import { onAuthStateChanged } from 'firebase/auth';

export interface IAuthProps {
    children: React.ReactNode;
}

const AuthRoute: React.FC<IAuthProps> = (props) => {
    const { children } = props;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    //const auth = 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setLoading(false);
            } else {
                console.log('No user is authenticated');
                setLoading(false);
                navigate({ to: '/auth' }); // Redirect to login if not authenticated
            }
        });

        return () => unsubscribe(); // Cleanup subscription on unmount
    }, [auth, navigate]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    return (<>{ children }</>); // Render children if authenticated
}

export default AuthRoute;
// This component checks if the user is authenticated and redirects to login if not