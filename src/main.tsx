import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Adjust the path based on your file structure
import { MovieProvider } from '@/context/MovieContext'; // Adjust the path
import { Provider } from 'react-redux';
import  store  from '@/services/store'; // Adjust the path to your Redux store
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <MovieProvider>
        <App />
      </MovieProvider>
    </Provider>
  </React.StrictMode>
);
