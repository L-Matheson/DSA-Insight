import { useState } from 'react'
import { Outlet } from 'react-router-dom' // Import Outlet

import './App.css'
import Header from './components/global/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <div className="app-layout">
        <main className="main-content">
          <div className="header-container">
             <Header />
          </div>
          <Outlet /> {/* This renders the child routes */}
        </main>
      </div>
    </div>
  )
}

export default App