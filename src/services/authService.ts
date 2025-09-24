import { LoginRequestDTO, LoginResponseDTO } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export class AuthService {
  static async login(email: string, password: string): Promise<LoginResponseDTO> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password } as LoginRequestDTO),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  }

  static getToken(): string | null {
    return localStorage.getItem('token');
  }

  static setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  static setUser(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  static logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  static isAuthenticated(): boolean {
    return !!this.getToken();
  }
}