import api from './axiosInstance'

export const generateRoadmap = ({ currentSkills, targetRole }) =>
  api.post('/roadmap', { currentSkills, targetRole })