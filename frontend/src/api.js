export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ||
  'https://aarambh-institute-1.onrender.com'
).replace(/\/+$/, '');

export default API_BASE_URL;
