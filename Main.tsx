
import React, { useState, useEffect } from 'react';
import App from './App';
import PlaygroundPage from './pages/PlaygroundPage';

const Main: React.FC = () => {
    const [route, setRoute] = useState(window.location.hash);

    useEffect(() => {
        const handleHashChange = () => {
            setRoute(window.location.hash);
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    if (route === '#playground') {
        return <PlaygroundPage />;
    }

    return <App />;
};

export default Main;
