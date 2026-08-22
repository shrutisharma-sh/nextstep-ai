import api from './axiosInstance'

export const sendCareerPlannerMessage = (question) =>
  api.post('/career-planner', { question })