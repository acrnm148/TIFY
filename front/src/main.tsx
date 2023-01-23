import React from 'react'
import ReactDOM from 'react-dom/client'
// import Header from './fixture/Header'
// import Footer from './fixture/Footer'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Header />
    <Footer /> */}
    <App />
  </React.StrictMode>,
)
