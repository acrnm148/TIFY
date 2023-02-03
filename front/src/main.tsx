import React from 'react';
import ReactDOM from 'react-dom/client';
// import Header from './fixture/Header'
// import Footer from './fixture/Footer'
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import store from './store/store';
import { CookiesProvider } from 'react-cookie';

// let store = configureStore({
//   reducer: {
//     // user : userSlice.reducer
//   },
// });
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </CookiesProvider>
  </React.StrictMode>,
);
