import interceptor from '../interceptor';
import type { LoginRequest } from '../interfaces/Authentication';

export const AuthService = {

  async login(credentials: LoginRequest): Promise<any> {
    try {
      const response = await interceptor.post('/login', credentials, {
        withCredentials: true
      });
      localStorage.setItem('token', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Login failed:', error);
    }
  },


  async logout() {
    localStorage.removeItem('token');
  },
  async isAdminUser(): Promise<boolean> {
    const response = await interceptor.get('/my-roles', {
      withCredentials: true
    });

    return response.data.roles.includes('admin');
  }
};
