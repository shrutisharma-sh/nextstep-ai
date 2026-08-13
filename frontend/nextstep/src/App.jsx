import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import CareerPlannerPage from './pages/CareerPlannerPage'
import ResumePage from './pages/ResumePage'
import RoadmapPage from './pages/RoadmapPage'
import LearningResourcePage from './pages/LearningResourcePage'
import HomePage from './pages/HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/career-planner" element={<CareerPlannerPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/roadmap" element={<RoadmapPage />} />
        <Route path="/learning-resource" element={<LearningResourcePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App