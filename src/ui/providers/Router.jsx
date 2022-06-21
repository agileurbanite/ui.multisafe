import { useStoreActions } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { __HistoryContext as HistoryContext, __RouterContext as RouterContext } from 'react-router';

const computeRootMatch = (pathname) => ({
    path: '/',
    url: '/',
    params: {},
    isExact: pathname === '/',
});

export const Router = ({ history, children }) => {
    const onRouteChange = useStoreActions((actions) => actions.general.onRouteChange);
    const [isMounted, setMounted] = useState(false);
    const [location, setLocation] = useState(history.location);

    useEffect(() => {
        const unlisten = history.listen(async (newLocation) => {
            await onRouteChange(history);
            setLocation(newLocation);
        });
        setMounted(true);
        return () => {
            unlisten();
        };
    }, [history, onRouteChange]);

    if (!isMounted) return null;

    return (
        <RouterContext.Provider
            value={{
                history,
                location,
                match: computeRootMatch(location.pathname),
            }}
        >
            <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>
        </RouterContext.Provider>
    );
};
