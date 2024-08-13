import { jwtDecode } from 'jwt-decode';

export function getUserIdFromToken() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.userId; // Assuming the token contains `userId`
  } catch (error) {
    console.error('Failed to decode token', error);
    return null;
  }
}
