import api from './axiosInstance'

export const analyzeResume = (resumeText) =>
  api.post('/resume-analysis', { resumeText })