import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Router>
      <div className="app">

            <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </main>

      </div>
    </Router>
  )
}

export default App