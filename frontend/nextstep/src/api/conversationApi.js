import api from './axiosInstance'

export const getConversations = () => api.get('/conversations')