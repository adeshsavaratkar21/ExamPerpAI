import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8000/api' : '/api');

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  // Health & Settings
  checkHealth: () => client.get('/health'),
  getApiStatus: () => client.get('/settings/status'),
  updateApiKeys: (data) => client.post('/settings/keys', data),
  seedDatabase: () => client.post('/seed'),

  // Subjects
  getSubjects: () => client.get('/subjects'),
  getSubjectDetail: (id) => client.get(`/subjects/${id}`),
  createSubject: (data) => client.post('/subjects', data),

  // PYQ Management
  uploadPYQ: (formData) =>
    client.post('/pyq/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getPYQDocuments: (subjectId) =>
    client.get('/pyq/documents', { params: { subject_id: subjectId } }),
  getSubjectPapers: (codeOrId) => client.get(`/pyq/subject-papers/${codeOrId}`),
  getAllPapers: () => client.get('/pyq/all-papers'),
  getQuestions: (params) => client.get('/pyq/questions', { params }),
  deletePYQDocument: (id) => client.delete(`/pyq/documents/${id}`),

  // Chapter Practice Quizzes
  generateQuiz: (data) => client.post('/quiz/generate', data),
  getQuiz: (id) => client.get(`/quiz/${id}`),
  submitQuiz: (data) => client.post('/quiz/submit', data),
  getQuizHistory: (chapterId) => client.get(`/quiz/history/${chapterId}`),

  // Mastery & Revision Notes (unified single-AI)
  getChapterNotes: (chapterId) => client.get(`/notes/chapter/${chapterId}`),
  generateMasteryNotes: (data) => client.post('/notes/generate', data, { timeout: 120000 }),
  generateDualNotes: (data) => client.post('/notes/generate', data, { timeout: 120000 }), // backward-compat alias
  markModuleComplete: (chapterId) => client.post(`/notes/chapter/${chapterId}/complete`),
  getRevisionSheet: (chapterId) => client.get(`/notes/chapter/${chapterId}/sheet`),
  generateRevisionSheet: (data) => client.post('/notes/sheet/generate', data, { timeout: 120000 }),
  askTutorDoubt: (data) => client.post('/notes/chat', data, { timeout: 90000 }),
  getMarkdownExportUrl: (chapterId) => `${API_BASE_URL}/notes/export/markdown/${chapterId}`,
  getPdfExportUrl: (chapterId) => `${API_BASE_URL}/notes/export/pdf/${chapterId}`,

  // Strategic Exam Readiness Tracker
  getReadinessReport: (subjectId) => client.get(`/analytics/subject/${subjectId}`),
  updateWeightage: (data) => client.post('/analytics/weightage', data),
  toggleChapterComplete: (chapterId) => client.post(`/syllabus/chapter/${chapterId}/toggle-complete`),

  // Reference Textbooks & College Prescribed Books
  getSubjectBooks: (identifier) => client.get(`/books/subject/${identifier}`),
  uploadBook: (formData) =>
    client.post('/books/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteBook: (subjectCode, filename) =>
    client.delete('/books/delete', { params: { subject_code: subjectCode, filename } }),

  // User Authentication & Audit Logs
  login: (data) => client.post('/auth/login', data),
  register: (data) => client.post('/auth/register', data),
  getCurrentUser: () => client.get('/auth/me'),
  updateProfile: (data) => client.put('/auth/profile', data),
  getUserProgress: (email) => client.get('/auth/progress', { params: { email } }),
  saveUserProgress: (data) => client.put('/auth/progress', data),
  getLoginHistory: (limit = 50) => client.get('/auth/login-history', { params: { limit } }),
  clearLoginHistory: () => client.delete('/auth/login-history'),

  // DSA & Campus Placement Mode
  getLeetCodeProfile: (username) => client.get(`/placement/leetcode/${username}`),
  getLeetCodeAllProblems: (params) => client.get('/placement/leetcode/all-problems', { params }),
  getPlacementRoadmap: (params) => client.get('/placement/roadmap', { params }),
  getPlacementDriveStats: () => client.get('/placement/placement-drive-stats'),
};

export default api;
