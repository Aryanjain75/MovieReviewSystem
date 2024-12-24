import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main routing setup
import { MovieProvider } from './context/MovieContext';
import { Provider } from 'react-redux';
import store from './services/store';
import './index.css';
import { ContextProvider } from './context/UserDetails';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
