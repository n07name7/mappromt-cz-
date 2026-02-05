// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';

// Vercel Serverless Functions живут на том же домене в /api
// Локально Vite тоже можно настроить, но для production путь относительный
export const API_BASE_URL = isDevelopment 
  ? 'http://localhost:3000/api'  // Для локальной разработки (если запущен backend отдельно или vercel dev)
  : '/api';  // Относительный путь для Vercel

export const API_ENDPOINTS = {
  geocode: isDevelopment ? 'http://localhost:3000/api/geocode' : '/api/geocode'
};

console.log('[Config] API Mode:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');
console.log('[Config] API Base URL:', API_BASE_URL);
