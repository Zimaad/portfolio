import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProjectDetail from './components/ProjectDetail'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <Router>
      <CustomCursor />

      {/* Subtle film-grain noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:slug" element={<ProjectDetail />} />
      </Routes>
    </Router>
  )
}
