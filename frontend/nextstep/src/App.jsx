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