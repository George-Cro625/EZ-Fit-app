import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import HomePage from './pages/HomePage'
import WelcomePage from './pages/WelcomePage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'

function App() {

  return (
    <Router>
      <div className="app">

            <main>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>

      </div>
    </Router>
  )
}

export default App