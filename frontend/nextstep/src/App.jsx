import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CareerPlannerPage from './pages/CareerPlannerPage'
import ResumePage from './pages/ResumePage'
import RoadmapPage from './pages/RoadmapPage'
import LearningResourcePage from './pages/LearningResourcePage'
import ProtectedRoute from './components/ProtectedRoute'

function AppLayout() {
  const location = useLocation()
  const hideNavbar = ['/login', '/signup','/career-planner'].includes(location.pathname)

  return (
    <>
      {!hideNavbar && <Navbar />}
      <div
        className="pointer-events-none fixed inset-0 z-40"
        style={{
          background: `
            radial-gradient(ellipse 900px 500px at 50% 0%, rgba(139,92,246,0.10), transparent 60%),
            radial-gradient(ellipse 800px 600px at 100% 40%, rgba(79,124,255,0.08), transparent 60%),
            radial-gradient(ellipse 800px 600px at 0% 60%, rgba(139,92,246,0.08), transparent 60%),
            radial-gradient(ellipse 1000px 600px at center, transparent 40%, rgba(2,2,8,0.55) 100%)
          `,
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
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
