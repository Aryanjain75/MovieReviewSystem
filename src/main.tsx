import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Main routing setup
import { MovieProvider } from './context/MovieContext';
import { Provider } from 'react-redux';
import store from './services/store';
import './index.css';
import { ContextProvider } from './context/UserDetails';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ContextProvider>
        <MovieProvider>
          <App />
          <ToastContainer // Add ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </MovieProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
);
