import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { App } from './ui/components/App';
import { store } from './store';
import { theme } from './ui/config/theme';

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
