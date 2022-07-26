import { MuiThemeProvider } from '@material-ui/core';
import { App } from '@ui/components/App';
import { theme } from '@ui/config/theme';
import { Initializer } from '@ui/providers/Initializer/Initializer';
import { Router } from '@ui/providers/Router';
import { StoreProvider } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import { StrictMode } from 'react';
import { render } from 'react-dom';

import { store } from './store';

const history = createBrowserHistory();

render(
    <StrictMode>
        <StoreProvider store={store}>
            <MuiThemeProvider theme={theme}>
                <Initializer history={history} store={store}>
                    <Router>
                        <App />
                    </Router>
                </Initializer>
            </MuiThemeProvider>
        </StoreProvider>
    </StrictMode>,
    document.getElementById('root'),
);
