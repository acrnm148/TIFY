import React from 'react'
import ReactDOM from 'react-dom/client'
// import Header from './fixture/Header'
// import Footer from './fixture/Footer'
import App from '../App'
import './index.css'
import { Provider } from 'react-redux'
// import giftSlice from '../pages/GiftHubPage'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {
    // gift: giftSlice.reducer,
  },
});

export default store;
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
export type RootState = ReturnType<typeof store.getState>