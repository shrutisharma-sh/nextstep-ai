import api from './axiosInstance'

export const getCareerInsights = (role) => api.post('/career-insights', { role })