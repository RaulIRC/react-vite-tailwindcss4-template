import { useEffect, useState } from 'react';
import { getAnalytics, logEvent } from "firebase/analytics";
import { useLocation as useReactRouterLocation } from '@tanstack/react-router';

export const Analytics = () => {
    const location = useReactRouterLocation();
    const [debugInfo, setDebugInfo] = useState({ screenName: '', screenClass: '' });

    const logScreenView = (screenName: string, screenClass: string) => {
        const webAnalytics = getAnalytics(); // Ensure this is called only when needed
        logEvent(webAnalytics, "page_view", {
            firebase_screen: screenName,
            firebase_screen_class: screenClass
        });
        setDebugInfo({ screenName, screenClass });
    };

    useEffect(() => {
        const currentPath = location.pathname;
        logScreenView(currentPath, "Analytics");
    }, [location.pathname]); // Only track changes to the pathname

    return (
        <>
            <div className="red-dot"></div>
            <div style={{
                position: 'fixed',
                bottom: '10px',
                left: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                padding: '10px',
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                borderRadius: '5px',
            }}>
                <strong>Debug Info</strong><br />
                Screen Name: {debugInfo.screenName}<br />
                Screen Class: {debugInfo.screenClass}<br />
                Current Path: {location.pathname}
            </div>
        </>
    );
};

export default Analytics;
