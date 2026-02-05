// API Configuration
const isDevelopment = import.meta.env.MODE === 'development';

export const API_BASE_URL = isDevelopment 
  ? 'https://graduate-administered-gonna-pants.trycloudflare.com/api'  // Cloudflare Tunnel backend
  : 'https://mapprompt-backend.netlify.app/api';  // Production

export const API_ENDPOINTS = {
  geocode: `${API_BASE_URL}/geocode`
};

console.log('[Config] API Mode:', isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION');
console.log('[Config] API Base URL:', API_BASE_URL);
