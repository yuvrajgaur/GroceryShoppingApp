//This file is the entry point of your React + Vite application, main.jsx is the first JavaScript file that runs when your app loads.
//It tells the browser how your app starts, where it attaches to HTML, and which global wrappers it uses.
//it connect HTML, React, global tools


import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {AppContextProvider} from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App/>
    </AppContextProvider>
  </BrowserRouter>,
)
