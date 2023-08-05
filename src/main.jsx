import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { FirebaseContextProvider } from './context/FirebaseContext.jsx'
import { AppContextProvider } from './context/AppContext.jsx'
import App from './App.jsx'
import './index.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <FirebaseContextProvider>
      <AuthContextProvider>   
          <AppContextProvider>
            <App />
          </AppContextProvider>
      </AuthContextProvider>
    </FirebaseContextProvider>
    </Router>
  </React.StrictMode>,
)
