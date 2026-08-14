import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CareerPlannerPage from './pages/CareerPlannerPage'
import ResumePage from './pages/ResumePage'
import RoadmapPage from './pages/RoadmapPage'
import LearningResourcePage from './pages/LearningResourcePage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,12,0.5) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/career-planner" element={<CareerPlannerPage />} />

        <Route path="/resume" element={<ProtectedRoute><ResumePage /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
        <Route path="/learning-resource" element={<ProtectedRoute><LearningResourcePage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App